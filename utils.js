exports.uniqueUrl = (url) => {

  if (!url) {
    throw new Error('No url defined');
  }

  return url + '&rand=' + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });

} // end uniqueUrl

exports.imageResponse = (imageUrl, text) => {

  if (!imageUrl) {
    throw new Error('No image url defined');
  }
  
  let message = { 
    "fulfillmentMessages": [
          {
            "image": {
              "imageUri" : imageUrl
            }
          }] 
        };

  if (text) {
    message.fulfillmentText = text;
    message.fulfillmentMessages.push({ "text" : { "text" : [ text ] }});
  }

  return(message); // end return

} // end imageResponse
