import { json, redirect } from "remix";
import * as bcrypt from "bcryptjs";
import { db } from "~/utils/db.server";
import { deleteUploadedFileById } from "~/utils/upload.server";
import { CreateUserType, UpdateUserType } from "~/validations/users";
import { validationError } from "remix-validated-form";

export const getUsers = async (take: number, skip: number) => {
  const users = await db.user.findMany({
    take,
    skip,
    select: {
      id: true,
      fullName: true,
      address: true,
      contact: true,
      role: true,
      username: true,
    },
    orderBy: { id: "desc" },
  });

  return json({ data: users, total: await db.user.count() });
};

export const getUser = async (id: number) => {
  const user = await db.user.findUnique({
    where: { id },
    include: { avatar: true },
  });

  if (!user) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return user;
};

export const createUser = async ({ file, ...data }: CreateUserType) => {
  const userExist = await findUserExist(data.username);
  if (userExist) return userExist;

  let avatarId = null;
  if (file) avatarId = parseInt(file);

  const password = await bcrypt.hash(data.password, 10);
  const user = await db.user.create({
    data: { ...data, avatarId, password },
    include: { avatar: true },
  });

  return redirect(`/users/${user.id}`);
};

export const updateUser = async (id: number, data: UpdateUserType) => {
  const { file, ...userData } = data;
  const user = await getUser(id);

  if (user.username !== data.username) {
    const userExist = await findUserExist(data?.username || "");
    if (userExist) {
      return userExist;
    }
  }

  if (data.password) {
    userData.password = await bcrypt.hash(data.password, 10);
  } else {
    userData.password = user.password;
  }

  let avatarId = user.avatarId;
  if (file) avatarId = parseInt(file);

  await db.user.update({
    where: { id },
    data: { avatarId, ...userData },
  });
  user.avatarId && file && deleteUploadedFileById(user.avatarId);

  return redirect(`/users/${user.id}`);
};

export const deleteUserById = async (id: number) => {
  const user = await getUser(id);

  user.avatarId && deleteUploadedFileById(user.avatarId);
  await db.user.delete({ where: { id: user.id } });
  return user;
};

export const findUserExist = async (username: string) => {
  const userExist = await db.user.findFirst({
    where: { username },
  });

  if (userExist) {
    return validationError({
      username: `Username "${username}" is already taken!`,
    });
  }
};
