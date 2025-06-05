import { Loader } from "@/app/_components/ui/dashboard-loader";
import { useError } from "@/app/lib/context/ErrorProvider";
import { apiRequest } from "@/app/lib/services";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import { Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";

function LanguagesMobile() {
  const { auth: storedData } = useAppSelector(selectAuth);
  const { handleError } = useError();
  const [updateLoading, setUpdateLoading] = useState(false);
  const [allLanguages, setAllLanguages] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [isEditingAboutMe, setIsEditingAboutMe] = useState(false);

  const fetchAllLanguages = async () => {
    try {
      const response = await apiRequest(
        "/languages",
        {
          method: "GET",
        },
        handleError
      );

      console.log("response ", response);
      if (response) {
        console.log("response ", response);
        setAllLanguages(response || []);
      }
    } catch (error) {
      console.error("Error fetching all languages:", error);
    }
  };
  const fetchLanguages = async () => {
    try {
      const response = await apiRequest(
        "/worker-languages",
        {
          method: "GET",
          headers: {
            ...(storedData && {
              Authorization: `Bearer ${storedData.token}`,
            }),
          },
        },
        handleError
      );

      if (response) {
        console.log(response);
        setLanguages(response || []);
        // setAboutMe(response.about_me || "");
      }
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };
  const addLanguage = async (id: any) => {
    try {
      setUpdateLoading(true);
      const response = await apiRequest(
        "/assign-language",
        {
          method: "POST",
          headers: {
            ...(storedData && {
              Authorization: `Bearer ${storedData.token}`,
            }),
          },
          body: {
            language_id: id,
          },
        },
        handleError
      );

      console.log("response ", response);
      if (response) {
        console.log("response ", response);
        fetchLanguages();
        // setAllLanguages(response || []);
      }
    } catch (error) {
      console.error("Error fetching all languages:", error);
    } finally {
      setUpdateLoading(false);
    }
  };
  const removeLanguage = async (id: any) => {
    try {
      setUpdateLoading(true);
      const response = await apiRequest(
        "/unassign-language",
        {
          method: "POST",
          headers: {
            ...(storedData && {
              Authorization: `Bearer ${storedData.token}`,
            }),
          },
          body: {
            language_id: id,
          },
        },
        handleError
      );

      console.log("response ", response);
      if (response) {
        console.log("response ", response);
        setLanguages(response || []);
        // fetchLanguages();
      }
    } catch (error) {
      console.error("Error fetching all languages:", error);
    } finally {
      setUpdateLoading(false);
    }
  };

  useEffect(() => {
    fetchAllLanguages();
    fetchLanguages();
  }, []);

  const handleAboutMeCancel = () => {
    setIsEditingAboutMe(false);
  };

  //   if (isLoading) {
  //     return <Loader />;
  //   }

  return (
    <div className="mt-6 w-full bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-wrap gap-4 mb-4">
        {languages.map((lang: any, index: any) => (
          <div
            key={index}
            onClick={() => {
              isEditingAboutMe && removeLanguage(lang?.language_id);
            }}
            className="cursor-pointer flex items-center gap-2 aria-disabled:cursor-default aria-disabled:opacity-70 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            aria-disabled={updateLoading}
          >
            <span className="">{lang?.language?.name}</span>
            {isEditingAboutMe && (
              <span>
                <X className="w-4 h-4 text-red-500" />
              </span>
            )}
          </div>
        ))}
        {languages.length === 0 && (
          <span className="text-gray-500">No languages added yet.</span>
        )}
      </div>

      {/* {true && ( */}
      {isEditingAboutMe && (
        <>
          <h4 className="text-lg font-semibold mb-3">Add Languages:</h4>
          <div className="flex gap-2 mb-4 flex-wrap">
            {/* -- {allLanguages?.length} */}
            {allLanguages.map(
              (lang: any, index: any) =>
                !languages?.find((l: any) => l?.language_id == lang?.id) && (
                  <div
                    key={index}
                    onClick={() => {
                      addLanguage(lang.id);
                    }}
                    title={`Add ${lang?.name}`}
                    aria-disabled={updateLoading}
                    className="cursor-pointer aria-disabled:cursor-default aria-disabled:opacity-70 flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    <span className="">
                      {/* {console.log(!!languages?.find((l: any) => l?.language_id == lang?.id))}
                          {!languages?.find((l: any) => l?.language_id == lang?.id) ? "+" : "-"} */}
                      {lang?.name}
                    </span>
                    <span>
                      <Plus className="w-4 h-4" />
                    </span>
                  </div>
                )
            )}
          </div>
        </>
      )}

      {isEditingAboutMe ? (
        <div className="flex justify-end">
          <button
            // onClick={handleAboutMeSave}
            onClick={handleAboutMeCancel}
            className="px-6 py-2 bg-[#5d0abc] text-white rounded-lg mr-4"
          >
            Done
          </button>
          {/* <button
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg"
              >
                Cancel
              </button> */}
        </div>
      ) : (
        <div className="flex justify-end">
          <button
            onClick={() => setIsEditingAboutMe(true)}
            className="px-6 py-2 bg-[#5d0abc] text-white rounded-lg mr-4"
          >
            Edit
          </button>
        </div>

      )}
    </div>
  );
}

export default LanguagesMobile;
