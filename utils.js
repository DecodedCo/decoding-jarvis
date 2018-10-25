exports.uniqueUrl = url => {
  if (!url) {
    throw new Error("No url defined");
  }

  return (
    (url.includes("?") ? url : `${url}?`) +
    "&rand=" +
    "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
  );
}; // end uniqueUrl
