export default {

  call(requestType, apidata) {

    console.log('apidata: ', apidata)
    console.log('type: ', requestType)
    var json = apidata.parameterList;

    var map = new Map();
    var mixarr = [];
    var listName = '';

    // Roop START ---> parameterList
    for (var i in json) {
      // DBG) console.log("parameterInfo1", json[i].parameterInfo1);
      // Roop START ---> parameterInfo1
      for (var y in json[i].parameterInfo1) {
        listName = json[i].parameterInfo1[y].parameterName1;
        var arr = []
        var mapchild = new Map();
        // Roop START ---> parameterList1
        for (var k in json[i].parameterInfo1[y].parameterList1) {
          if (requestType == "2") {
            if (json[i].parameterInfo1[y].parameterList1[k].key.indexOf("operationPermissionName") != -1) {
              mapchild.set("operationPermissionType" + [k - 1], json[i].parameterInfo1[y].parameterList1[k].value);
            } else {
              mapchild.set(json[i].parameterInfo1[y].parameterList1[k].key, json[i].parameterInfo1[y].parameterList1[k].value);
            }
          } else if (requestType == "4") {
            if (json[i].parameterInfo1[y].parameterList1[k].key.indexOf("screenDspName") != -1) {
              var screenDspName = json[i].parameterInfo1[y].parameterList1[k].value
            }
            if (json[i].parameterInfo1[y].parameterList1[k].key.indexOf("screenId") != -1) {
              var screenId = json[i].parameterInfo1[y].parameterList1[k].value
            }
            mapchild.set(screenId, screenDspName);
          } else if (requestType == "5") {
            mapchild.set(
              "screenGrName",
              json[i].parameterInfo1[y].parameterList1[k].value
            )
          } else {
            mapchild.set(
              json[i].parameterInfo1[y].parameterList1[k].key,
              json[i].parameterInfo1[y].parameterList1[k].value
            );
          }
        }
        if (json[i].parameterInfo1[y].parameterInfo2) {
          // Roop START ---> parameterInfo2
          for (var pi2 in json[i].parameterInfo1[y].parameterInfo2) {
            var mapchild2 = new Map();
            for (var pl2 in json[i].parameterInfo1[y].parameterInfo2[pi2].parameterList2) {
              if (requestType == "3") {
                mapchild.set(
                  json[i].parameterInfo1[y].parameterInfo2[pi2].parameterList2[pl2].key,
                  json[i].parameterInfo1[y].parameterInfo2[pi2].parameterList2[pl2].value
                );
              } else if (requestType == "5") {
                if (json[i].parameterInfo1[y].parameterInfo2[pi2].parameterList2[pl2].key.indexOf("screenDspName") != -1) {
                  mapchild2.set("screenDspName", json[i].parameterInfo1[y].parameterInfo2[pi2].parameterList2[pl2].value);
                }
                if (json[i].parameterInfo1[y].parameterInfo2[pi2].parameterList2[pl2].key.indexOf("screenId") != -1) {
                  mapchild2.set("screenId", json[i].parameterInfo1[y].parameterInfo2[pi2].parameterList2[pl2].value);
                }
                if (json[i].parameterInfo1[y].parameterInfo2[pi2].parameterList2[pl2].key.indexOf("opeTypeKind") != -1) {
                  mapchild2.set(
                    json[i].parameterInfo1[y].parameterInfo2[pi2].parameterList2[pl2].key,
                    json[i].parameterInfo1[y].parameterInfo2[pi2].parameterList2[pl2].value
                  );
                }
              } else {
                mapchild2.set(
                  json[i].parameterInfo1[y].parameterInfo2[pi2].parameterList2[pl2].key,
                  json[i].parameterInfo1[y].parameterInfo2[pi2].parameterList2[pl2].value
                );
              }
            }
            // DBG) console.log("mapchild2(MAP)==> ", mapchild2)
            var jsonChild2 = strMapToObj(mapchild2);
            // DBG) console.log("jsonChild2(JSON)==> ", jsonChild2);
            arr.push(jsonChild2)
            // DBG) console.log("arr(array)==> ", arr);
          }
        }
        if (!requestType == "2" || requestType == "5") {
          mapchild.set("opeGroupAuthList", arr);
        }
        // DBG) console.log("mapchild(MAP)==> ", mapchild);
        var jsonChild = strMapToObj(mapchild);
        // DBG) console.log("jsonChild(JSON)==> ", jsonChild);
        if (requestType == "1" || requestType == "3" || requestType == "4" || requestType == "5") {
          mixarr.push(jsonChild);
        }
      }
    }
    if (requestType == "1" || requestType == "3" || requestType == "4" || requestType == "5") {
      // DBG) console.log("mixarr(array)==> ", mixarr);
      map.set(listName, mixarr);
    }
    if (requestType == "0" || requestType == "2") {
      map.set(listName, jsonChild);
    }
    // DBG) console.log("MAP==", map);
    var COMPJSON = strMapToObj(map);
    function strMapToObj(optLists) {
      let obj = Object.create(null);
      for (let [k, v] of optLists) {
        obj[k] = v;
      }
      return obj;
    }
    // DBG) 
    console.log("RESULT => ", COMPJSON[listName]);

    return COMPJSON[listName]
  }
}
