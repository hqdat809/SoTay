import { get, getDatabase, ref, remove, set, update } from "firebase/database";
import { ICategory } from "../interfaces/category-interface";

export const getCategoryService = async () => {
  // const response = await ApiClient.get(`/category/get-category`);

  try {
    const db = getDatabase();
    const snapshot = await get(ref(db, "data_markdown/"));
    const response = snapshot.val();
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error getting data: ", error);
    throw error; // Ensure that errors are thrown
  }
};

export const createCategoryService = async (payload: ICategory) => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    const idFormatted = payload.id.replace(/\./g, "_");
    const questionRef = ref(db, `data_markdown/question_${idFormatted}`);

    get(questionRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const error = new Error(
            "Data with this id already exists. Cannot create a new one."
          );
          reject(error);
        } else {
          set(questionRef, {
            answer: payload.answer,
            id: payload.id,
            content: payload.content,
            text: payload.text,
          })
            .then((data) => {
              console.log("Data saved successfully.");
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateCategoryService = async (payload: ICategory) => {
  const db = getDatabase();
  const idFormatted = payload.id.replace(/\./g, "_");
  update(ref(db, `data_markdown/question_${idFormatted}`), {
    answer: payload.answer,
    id: payload.id,
    content: payload.content,
    text: payload.text,
  })
    .then(() => {
      console.log("Data saved successfully.");
    })
    .catch((error) => {
      console.error("Error saving data: ", error);
    });
};

export const deleteCategory = async (payload: string[]) => {
  // const response = await ApiClient.delete(`/category/delete-category`, {
  //   data: { ids: payload },
  // });

  const db = getDatabase();
  const deletePromises = payload.map((id) => {
    const idFormatted = id.replace(/\./g, "_");
    console.log(idFormatted);
    return remove(ref(db, `data_markdown/question_${idFormatted}`))
      .then(() => {
        console.log("Data saved successfully.");
      })
      .catch((error) => {
        console.error("Error saving data: ", error);
      });
  });

  try {
    await Promise.all(deletePromises);
    console.log("All entries deleted successfully");
  } catch (error) {
    console.error("Error deleting entries: ", error);
  }

  // return response.data;
};
