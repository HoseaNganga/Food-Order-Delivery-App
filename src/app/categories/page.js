"use client";
import AdminTabs from "@/Components/AdminTabs/AdminTabs";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAdminTabs } from "@/Components/ReUseAdminTabs/ReUseAdminTabs";

const CategoriesPage = () => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const { loadingInfo, isAdmin } = useAdminTabs();
  const [categoryList, setCategoryList] = useState([]);
  const [editingCategoryName, setEditingCategoryName] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch(`/api/categories`)
      .then((resp) => resp.json())
      .then((data) => {
        setCategoryList(data);
      });
  }

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    const categoryPromise = new Promise(async (resolve, reject) => {
      const data = { name: newCategoryName };
      if (editingCategoryName) {
        data._id = editingCategoryName._id;
      }
      const resp = await fetch(`/api/categories`, {
        method: editingCategoryName ? "PUT" : "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      fetchCategories();
      setEditingCategoryName(null);
      if (resp.ok) resolve();
      else reject();
    });
    await toast.promise(categoryPromise, {
      loading: editingCategoryName
        ? "UpdatingCategory"
        : "Creating new Category...",
      success: editingCategoryName
        ? "Successfully updated Category"
        : "Successfully created new Category",
      error: "Error creating category",
    });
    setNewCategoryName("");
  };
  const handleDeleteCategory = async (id) => {
    const categoryDeletePromise = new Promise(async (resolve, reject) => {
      const resp = await fetch(`/api/categories?id=${id}`, {
        method: "DELETE",
      });
      if (resp.ok) resolve();
      else reject();
    });

    await toast.promise(categoryDeletePromise, {
      loading: "Deleting Category...",
      success: "Successfully Deleted Category",
      error: "Error",
    });

    fetchCategories();
  };

  if (loadingInfo) {
    return "Loading Info";
  }
  if (!isAdmin) {
    return "You are not an administrator";
  }
  return (
    <section className="max-w-md m-auto ">
      <AdminTabs isAdmin={isAdmin} />
      <form className="glassmorphism max-w-md" onSubmit={handleCategorySubmit}>
        <div className="flex items-end gap-2 ">
          <div className="grow ">
            <label>
              {editingCategoryName ? "Update Category:" : "New Category name:"}
            </label>
            <input
              type="text"
              className="form_input"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
          </div>
          <div className="pb-2 flex gap-2">
            <button type="submit" className="style_btn hover:bg-green-600">
              {editingCategoryName ? "Update" : "Create"}
            </button>
            <button
              type="button"
              className="style_learnbtn hover:bg-green-600"
              onClick={() => {
                setEditingCategoryName(null);
                setNewCategoryName("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <div className="mt-8 glassmorphism max-w-md">
        <h2>Existing Category:</h2>
        {categoryList?.length > 0 &&
          categoryList.map((category) => (
            <div
              key={category._id}
              className=" form_input font-semibold hover:bg-slate-300 flex justify-between gap-2 "
            >
              <div>{category.name}</div>
              <div className="flex gap-1 ">
                <button
                  type="button"
                  onClick={() => {
                    setEditingCategoryName(category);
                    setNewCategoryName(category.name);
                  }}
                  className="style_learnbtn hover:bg-green-600"
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="style_learnbtn hover:bg-green-600"
                  onClick={() => handleDeleteCategory(category?._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default CategoriesPage;
