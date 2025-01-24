import React, { useState } from "react";
import { IStep } from "../../type/form.type";
import { useForm } from "react-hook-form";
import {
  continentAbbreviation,
  continents,
  countriesByContinent,
} from "../../constant/continent";
import { postCategories } from "../../constant/post.category";
import { useAppSelector } from "../../redux/ReduxType";
import { RxCross1 } from "react-icons/rx";
import { CountrySelect, StateSelect } from "react-country-state-city";
import axios from "axios";
import { getStates } from "../../utils/getCountryState";
import LoaderSpinner from "../../components/molecules/Loader/Loader.spinner";
import { useMakeRequest } from "../../hooks/useMakeRequest";
import { USER_URL } from "../../constant/resource";
import toast from "react-hot-toast";

const StepFive: React.FC<IStep> = ({ id: step }) => {
  const [formData, setFormData] = useState<{}>({
    continent: [],
    categories: [],
    countries: [],
    states: [],
  });
  const [continent, setContinent] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [countryList, setCountryList] = useState<string[]>([]);
  const [states, setStates] = useState([]);
  const [stateList, setStateList] = useState<string[]>([]);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const isDark = useAppSelector((state) => state.theme.isDark);
  const User = useAppSelector((state) => state.user);
  const [loadingState, setLoadingState] = useState(false);
  const [seeMore, setSeeMore] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingGeneral, setLoadingGeneral] = useState(false);
  const makeRequest = useMakeRequest();

  // --------- continent ----------
  const addNewContinent = (continentToAdd: string) => {
    const isIncluded = continent?.includes(continentToAdd);
    if (isIncluded) return;
    const updatedContinents = [...continent, continentToAdd];
    setContinent(updatedContinents);
    setFormData((prev) => ({
      ...prev,
      continent: updatedContinents,
    }));
  };

  const removeNewContinent = (continentToRemove: string) => {
    const isIncluded = continent?.includes(continentToRemove);
    if (!isIncluded) return;
    const newContient = continent.filter(
      (eachContient) => eachContient !== continentToRemove
    );
    setContinent(newContient);
    setFormData((prev) => ({
      ...prev,
      continent: newContient,
    }));
    // console.log(continent)
  };

  //   const handleContinent = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //     const selectedContinent = String(event.target.value);
  //     addNewContinent(selectedContinent);
  //     setCountries(countriesByContinent[selectedContinent]);
  //   };

  const handleContinent = (value: any) => {
    const selectedContinent = String(value);
    addNewContinent(selectedContinent);
    setCountries(countriesByContinent[selectedContinent]);
  };

  const handleContinentSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event?.target?.value;
    handleContinent(value);
    removeNewContinent(value);
  };

  // --------- country ----------
  const addNewCountry = (countryToAdd: string) => {
    const isIncluded = countryList?.includes(countryToAdd);
    if (isIncluded) return;
    const updatedCountry = [...countryList, countryToAdd];
    setCountryList(updatedCountry);
    setFormData((prev) => ({
      ...prev,
      countries: updatedCountry,
    }));
  };

  const removeNewCountry = (countryToRemove: string) => {
    const isIncluded = countryList?.includes(countryToRemove);
    if (!isIncluded) return;
    const newCountries = countryList.filter(
      (eachCountry) => eachCountry !== countryToRemove
    );
    setCountryList(newCountries);
    setFormData((prev) => ({
      ...prev,
      countries: newCountries,
    }));
  };

  const handleCountry = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry: any = event.target.value;
    addNewCountry(selectedCountry);

    // console.log('selection -->',selectedCountry)
    try {
      setLoadingState(true);
      const stateList = await getStates(selectedCountry);
      setStates(stateList);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState(false);
    }
    setCountries(countriesByContinent[selectedCountry]);
  };

  // --------- state ----------
  const removeNewState = (stateToRemove: string) => {
    const isIncluded = stateList?.includes(stateToRemove);
    if (!isIncluded) return;
    const newState = stateList.filter(
      (eachState) => eachState !== stateToRemove
    );
    setStateList(newState);
    setFormData((prev) => ({
      ...prev,
      states: newState,
    }));
    // setFormData({...formData, states: stateList as []})
    // console.log(countries)
  };

  const addNewState = (stateToAdd: string) => {
    const isIncluded = stateList?.includes(stateToAdd);
    if (isIncluded) return;
    const newState = [...stateList, stateToAdd];
    setStateList(newState);
    setFormData((prev) => ({
      ...prev,
      states: newState,
    }));
    // setFormData({...formData, states: stateList as []})
  };
  const handleState = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedState = event?.target?.value;
    addNewState(selectedState);
  };

  // --------- category ----------
  const addNewCategory = (categoryToAdd: string) => {
    const isIncluded = categoryList?.includes(categoryToAdd);
    if (isIncluded) return;
    const newCategory = [...categoryList, categoryToAdd];
    // setCategoryList(prev=>([...prev, categoryToAdd]))
    setCategoryList(newCategory);
    setFormData((prev) => ({
      ...prev,
      categories: newCategory,
    }));
  };

  const removeNewCategory = (categoryToRemove: string) => {
    const isIncluded = categoryList?.includes(categoryToRemove);
    if (!isIncluded) return;
    const newCategory = categoryList.filter(
      (eachCategory) => eachCategory !== categoryToRemove
    );
    setCategoryList(newCategory);
    setFormData((prev) => ({
      ...prev,
      categories: newCategory,
    }));
  };

  const handleCategory = (value: string) => {
    addNewCategory(value);
  };

  const handleCategorySelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event?.target?.value;
    handleCategory(value);
    removeNewCategory(value);
  };

  // --------- submit ----------

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoadingUpdate(true);

      const userId = User?._id;

      const payload = {
        userId,
        preference: { ...formData },
      };

      const onSuccess = () => {
        toast.success("profile updated");
      };

      const onFailure = () => {
        toast.error("Error updating profile, try again");
      };

      const onFinal = () => {
        setLoadingUpdate(false);
      };

      await makeRequest(
        USER_URL + "/update",
        "PUT",
        payload,
        onSuccess,
        onFailure,
        onFinal
      );
    } catch (error) {
      console.log(error);
    }
    // --- send to the backend -----
  };

  const handleGeneral = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoadingGeneral(true);
    try {
      const payload = {
        userId: User?._id,
        preference: {
          continent: [],
          categories: [],
          countries: [],
          states: [],
        },
      };

      const onSuccess = () => {
        toast.success("Preference updated");
      };

      const onFailure = (error: any) => {
        toast.error("Error updating preference");
        console.log(error);
      };

      const onFinal = () => {
        setLoadingGeneral(false);
      };
      await makeRequest(
        USER_URL + "/update",
        "PUT",
        payload,
        onSuccess,
        onFailure,
        onFinal
      );
    } catch (error) {
      toast.error("Error processing request");
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <h1 className="mb-5">Choose Feed preference(As many choices)</h1>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col items-start justify-between gap-10 w-full">
          <div className="w-full">
            <p className="font-Mon">Continent</p>
            {/* <select onChange={handleContinent} className={`rounded outline-none bg-inherit p-2 border ${isDark ? 'text-white bg-[#4E31AA]': 'text-darkBg bg-darkText'} border-neutral-500 w-[200px] outline-[2px]`}>
                        {
                            continents?.map((eachContinent)=>{
                                return(
                                    <option value={eachContinent.value}>{eachContinent.label}</option>
                                )
                            })
                        }
                    </select> */}
            <div className="flex items-start justify-start gap-5 w-full flex-wrap">
              {continents?.map((eachContinent) => {
                return (
                  <div className="flex items-center justify-start gap-[2px]">
                    <input
                      onChange={handleContinentSelect}
                      value={eachContinent.value}
                      type="checkbox"
                    />
                    <p>{eachContinent?.label}</p>
                  </div>
                );
              })}
            </div>
            {/* user selections */}
            {/* <div className="flex items-start justify-start gap-2 flex-wrap mt-2 w-fit">
              {continent?.map((eachContinent: any) => {
                return (
                  <div
                    className={`flex items-center justify-center gap-1 ${
                      isDark ? "bg-deepBg" : "bg-neutral-300 p-[2px]"
                    }`}
                  >
                    <p className="text-sm">
                      {continentAbbreviation[eachContinent]}
                    </p>
                    <RxCross1
                      onClick={() => {
                        removeNewContinent(eachContinent);
                      }}
                      className="hover:text-red-500 cursor-pointer"
                    />
                  </div>
                );
              })}
            </div> */}
          </div>

          <hr className="w-full h-[0.5px] bg-neutral-300 mt-5" />

          <div className="w-full">
            <p className="font-Mon">Country</p>
            <select
              onChange={handleCountry}
              name="country"
              id=""
              className={`rounded outline-none bg-inherit p-2 border border-neutral-500 w-full outline-[2px] ${
                isDark ? "text-white bg-[#4E31AA]" : "text-darkBg bg-darkText"
              }`}
            >
              {countries?.map((eachCountry: string) => {
                return (
                  <option value={eachCountry?.toLowerCase()}>
                    {eachCountry}
                  </option>
                );
              })}
            </select>
            {/* country list */}
            <div className="flex flex-col items-start justify-start gap-2 flex-wrap mt-2 w-full">
              {countryList?.map((eachCountry: any) => {
                return (
                  <div
                    className={`flex items-center justify-center gap-1 ${
                      isDark ? "bg-deepBg" : "bg-neutral-300 p-[2px]"
                    } p-[2px]`}
                  >
                    <p className="text-sm">{eachCountry}</p>
                    <RxCross1
                      onClick={() => {
                        removeNewCountry(eachCountry);
                      }}
                      className="hover:text-red-500 cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <hr className="w-full h-[0.5px] bg-neutral-300 mt-5" />

        <div className="flex flex-col items-start justify-between mt-5 w-full">
          <div className="w-full">
            <p className="font-Mon">State</p>
            {loadingState ? (
              <LoaderSpinner color={"blue"} />
            ) : (
              <select
                onChange={handleState}
                name="country"
                id=""
                className={`rounded outline-none bg-inherit p-2 border border-neutral-500 ${
                  isDark ? "text-white bg-[#4E31AA]" : "text-darkBg bg-darkText"
                } w-full outline-[2px]`}
              >
                {states?.map((eachState: any) => {
                  return <option>{eachState?.name}</option>;
                })}
              </select>
            )}
            <div className="flex items-start justify-start gap-2 flex-wrap mt-2 w-full">
              {stateList?.map((eachState: any) => {
                return (
                  <div
                    className={`flex items-center justify-center gap-1 ${
                      isDark ? "bg-deepBg" : "bg-neutral-300 p-[2px]"
                    } p-[2px]`}
                  >
                    <p className="text-sm">{eachState}</p>
                    <RxCross1
                      onClick={() => {
                        removeNewState(eachState);
                      }}
                      className="hover:text-red-500 cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <hr className="w-full h-[0.5px] bg-neutral-300 my-5" />

          <div className="w-full">
            <p className="font-Mon mb-3">Choose All Interested Category</p>
            {/* <select
              onChange={handleCategory}
              name="category"
              id=""
              className={`rounded outline-none bg-inherit p-2 border border-neutral-500 ${
                isDark ? "text-white bg-[#4E31AA]" : "text-darkBg bg-darkText"
              } w-[200px] outline-[2px]`}
            >
              {postCategories?.map((eachCategory) => {
                return (
                  <option value={eachCategory?.value}>
                    {eachCategory?.label}
                  </option>
                );
              })}
            </select> */}
            {/* <div className="flex items-start justify-start gap-2 flex-wrap mt-2 w-fit">
              {categoryList?.map((eachCategory: any) => {
                return (
                  <div
                    className={`flex items-center justify-center gap-1 ${
                      isDark ? "bg-deepBg" : "bg-neutral-300"
                    } p-[2px]`}
                  >
                    <p className="text-sm">{eachCategory}</p>
                    <RxCross1
                      onClick={() => {
                        removeNewCategory(eachCategory);
                      }}
                      className="hover:text-red-500 cursor-pointer"
                    />
                  </div>
                );
              })}
            </div> */}
            <div
              className={`flex items-start transition-all duration-700 justify-start gap-5 flex-wrap ${
                seeMore ? "h-[100px] overflow-hidden" : ""
              }`}
            >
              {postCategories?.map((eachCategory: any) => {
                return (
                  <div className="flex items-center transition-all duration-700 justify-center w-fit gap-[2px]">
                    <input
                      onChange={handleCategorySelect}
                      value={eachCategory.value}
                      type="checkbox"
                    />
                    <p>{eachCategory?.label}</p>
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => {
                setSeeMore(!seeMore);
              }}
              className="px-4 py-2 rounded-sm text-blue transition-all duration-700 underline"
            >
              {seeMore ? "See More" : "See Less"}
            </button>
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <button
            type="submit"
            className={`mt-10 ${
              isDark ? "bg-deepBg" : "bg-darkBg"
            } text-white hover:bg-green-500 rounded-sm px-4 py-2`}
          >
            {loadingUpdate ? <LoaderSpinner color={"blue"} /> : "Submit"}
          </button>
          <button
            type="button"
            onClick={handleGeneral}
            className={`mt-10 ${
              isDark ? "bg-deepBg" : "bg-darkBg text-black"
            } text-white hover:bg-red-500 rounded-sm px-4 py-2`}
          >
            {loadingGeneral ? (
              <LoaderSpinner color={"white"} />
            ) : (
              "General (All)"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepFive;
