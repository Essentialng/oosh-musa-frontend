export const getTokens = () => ({
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
  });

export const storeTokens = (accessToken: string) => {
    localStorage.setItem('accessToken', accessToken);
  };


export const removeTokens = () => {
    localStorage.removeItem('accessToken');
  };