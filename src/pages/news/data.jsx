// latest
// popular
// trending
// technology
// business
// politics
// entertainment

// export const getLatestNews = (data) => {
//   console.log("res -->", data?.slice(0, 4));
//   return data?.slice(0, 4);
// };

// export const getTrendingNews = (data) => {
//   const trending = data.filter((eachNews) => {
//     return eachNews?.views <= 3;
//   });
//   return trending;
// };

// const getPopularNews = (data) => {
//   const popular = data.filter((eachNews) => {
//     return eachNews?.likes <= 3;
//   });
//   return popular;
// };

// const featuredNews = (data) => {
//   const featuredNews = data.filter((eachNews) => {
//     return eachNews?.is_featured;
//   });
//   return featuredNews;
// };

// const technologyNews = (data) => {
//   const techNews = data.filter((eachNews) => {
//     return eachNews?.category_names === "Technology";
//   });
//   return techNews;
// };

// const politicalNews = (data) => {
//   const techNews = data.filter((eachNews) => {
//     return eachNews?.category_names === "Politics";
//   });
//   return techNews;
// };

// const businessNews = (data) => {
//   const techNews = data.filter((eachNews) => {
//     return eachNews?.category_names === "Business";
//   });
//   return techNews;
// };

// const entertainmentNews = (data) => {
//   const techNews = data.filter((eachNews) => {
//     return eachNews?.category_names === "Entertainment";
//   });
//   return techNews;
// };

// --- v2 ---
// Utility functions for filtering news data

export const getLatestNews = (data, volume) => {
  // console.log("res -->", data?.slice(0, 4));
  return data?.slice(0, volume);
};

export const getTrendingNews = (data) => {
  if (!data) return;
  const trending = data
    .filter((eachNews) => {
      return eachNews?.views >= 3;
    })
    .slice(0, 5);
  // console.log("view -->", trending);
  return trending;
};

export const getPopularNews = (data) => {
  const popular = data
    .filter((eachNews) => {
      return eachNews?.is_breaking;
    })
    .slice(0, 5);
  return popular;
};

export const featuredNews = (data, volume) => {
  const featuredNews = data
    .filter((eachNews) => {
      return eachNews?.is_featured;
    })
    .slice(0, volume);

  return featuredNews;
};

export const technologyNews = (data) => {
  const techNews = data.filter((eachNews) => {
    return eachNews?.category_names === "Technology";
  });
  return techNews;
};

export const politicalNews = (data) => {
  const techNews = data.filter((eachNews) => {
    return eachNews?.category_names === "Politics";
  });
  return techNews;
};

export const businessNews = (data) => {
  const techNews = data.filter((eachNews) => {
    return eachNews?.category_names === "Business";
  });
  return techNews;
};

export const entertainmentNews = (data) => {
  const techNews = data.filter((eachNews) => {
    return eachNews?.category_names === "Entertainment";
  });
  return techNews;
};
