(function(windows){
  function ReadUtils(){
  }
  ReadUtils.parseXML=function(value){
                if (document.implementation && document.implementation.createDocument) {
                    xmlDoc = new DOMParser().parseFromString(value, 'text/xml');
                }
                else if (window.ActiveXObject) {
                    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                    xmlDoc.loadXML(value);
                }
                else
                {
                    Alert.show('Your browser can\'t handle this script');
                    return null;
                }
                return xmlDoc;
            }
window.ReadUtils=ReadUtils;
}(window)
)

