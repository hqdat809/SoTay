import { fork } from "redux-saga/effects";
import {
  get,
  getDatabase,
  orderByChild,
  orderByKey,
  orderByPriority,
  orderByValue,
  query,
  ref,
  set,
  update,
} from "firebase/database";
import {
  TChangePasswordRequest,
  TCreateUserRequest,
  TTransferEquipment,
  TUpdateUserRequest,
} from "../interfaces/user-interfaces";
import { ApiClient } from "./api-clients";

export const getUsers = async () => {
  try {
    const db = getDatabase();
    const usersRef = ref(db, "users/");
    const orderedQuery = query(usersRef);
    const snapshot = await get(orderedQuery);
    const response: any[] = snapshot.val();
    const usersArray = Object.entries(response).map(([id, data]) => ({
      id,
      ...data,
    }));
    const sortedUsersArray = usersArray.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    sortedUsersArray.forEach((user) => {
      update(ref(db, "users/" + user.id), {
        accessExpiration: 1750032000000,
      })
        .then(() => {
          console.log("Data updated successfully.");
        })
        .catch((error) => {
          console.error("Error saving data: ", error);
        });
    });

    console.log(response);
    return sortedUsersArray;
  } catch (error) {
    console.error("Error getting data: ", error);
    throw error; // Ensure that errors are thrown
  }
};

export const createUser = async ({
  expiration,
  ...account
}: TCreateUserRequest) => {
  const response = await ApiClient.post(`/users/create`, account);

  // create user in database
  const userId = response.data.uid;
  const db = getDatabase();

  if (typeof expiration === "object") {
    expiration = expiration.getTime();
    console.log(expiration);
  } else {
    const dateObject = new Date(expiration);
    expiration = dateObject.getTime();
  }

  set(ref(db, "users/" + userId), {
    email: account.email,
    accessExpiration: expiration,
    createdAt: Date.now(),
  })
    .then(() => {
      console.log("Data saved successfully.");
    })
    .catch((error) => {
      console.error("Error saving data: ", error);
    });

  return response;
};

export const updateUser = async ({
  id,
  expiration,
  ...payload
}: TUpdateUserRequest) => {
  // const response = await ApiClient.post(`/user/update/${payload.id}`, payload);
  const db = getDatabase();

  if (typeof expiration === "object") {
    expiration = expiration.getTime();
    console.log(expiration);
  } else {
    const dateObject = new Date(expiration);
    expiration = dateObject.getTime();
    console.log(expiration);
  }

  update(ref(db, "users/" + id), {
    accessExpiration: expiration,
  })
    .then(() => {
      console.log("Data updated successfully.");
    })
    .catch((error) => {
      console.error("Error saving data: ", error);
    });

  return;
};

export const changePasswordUser = async (payload: TChangePasswordRequest) => {
  const response = await ApiClient.post(`/users/change-password`, {
    uid: payload.id,
    newPassword: payload.password,
  });

  return response.data;
};

export const deleteUser = async (payload: number[]) => {
  console.log(payload);
  const response = await ApiClient.delete(`/user/delete`, {
    data: { ids: payload },
  });

  return response.data;
};

export const transferService = async (payload: TTransferEquipment) => {
  const response = await ApiClient.post(
    `/equipment/transfer/${payload.userId}`,
    {
      ids: payload.equipmentIds,
    }
  );

  return response.data;
};

export const createDeviceToken = async (
  userId: number,
  deviceToken: string
) => {
  const response = await ApiClient.post(
    `/user/create-device-token/${userId}/${deviceToken}`
  );

  return response.data;
};
