export const getImageUrl = (fileName: string) => {
  return new URL(`/src/assets/images/${fileName}.png`, import.meta.url).href
}
