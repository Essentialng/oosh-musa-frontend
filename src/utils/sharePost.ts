export const handleSocial = (
  content: string,
  url: string,
  platform: string
) => {
  const socialPlatforms: any = {
    twitter: `https://twitter.com/intent/tweet?text=${content}&url=${url}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    whatsApp: `https://api.whatsapp.com/send?text=${content} ${url}`,
  };
  window.open(socialPlatforms[platform], "_blank");
};
