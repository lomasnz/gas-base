const DOC = {
  DOC_ID: "documentId",
  INSTANCE_DATA: "instanceData",
  ENTITY_CONFIG: "entityConfig",
  NAME_SPACE: "nameSpace",
  URL: "url",
  MANAGED: "managed",
  ICON_URL: "iconUrl",
  ENTITY_FOLDER_ID: "entityFolderId"
}
const DOC_CACHE = {
  DOC_ID: "documentId",
  NAME_SPACE: "nameSpace",
  CACHE_TIME: "cacheTime"
}

const NO_NAME_SPACE = "no.name.space";

class S6Doc {

  constructor(docJson, file, secret) {
    if (secret != "#PRIVATE") {
      throw "Use the factory functions starting with new...(). Do not construct your own S6Entity";
    }
    this.document = docJson;
    this.file = file;
    Object.freeze(this.doc);
    Object.freeze(this);
  }

  isFolder() {
    return S6Utility.isFileFolder(this.file);
  }

  static _newUnManaged(file) {
    //console.log("Unamanged file: ", file.getName());
    const icon = S6Utility.getIconUrlForFile(file);
    var res;
    var doc = {
      [DOC.DOC_ID]: file.getId(),
      [DOC.INSTANCE_DATA]: EMPTY,
      [DOC.ENTITY_CONFIG]: EMPTY,
      [DOC.NAME_SPACE]: NO_NAME_SPACE,
      [DOC.URL]: file.getUrl(),
      [DOC.MANAGED]: NO,
      [DOC.ICON_URL]: icon,
      [DOC.ENTITY_FOLDER_ID]: EMPTY
    }
    res = new S6Doc(doc, file, "#PRIVATE");
    return res;

  }

  static _new(documentId, folderId, file, nameSpace = NO_NAME_SPACE, managed = YES) {
    var res;
    const url = file.getUrl();
    const icon = S6Utility.getIconUrlForFile(file);
    var instance = S6EntityInstance.newFromFolderId(folderId, nameSpace);
    //console.log(instance.data, "/", INSTANCE.CONFIG_ID, "/", instance.data[INSTANCE.CONFIG_ID]);
    var entity = S6Entity.newFromNameSpace(nameSpace);
    if (!entity) {
      var master = S6Master.newMaster();
      entity = master.getEntityForOrginalConfigId(instance.data[INSTANCE.DEPRECATED_CONFIG_ID]);
    }
    var doc = {
      [DOC.DOC_ID]: documentId,
      [DOC.INSTANCE_DATA]: instance.data,
      [DOC.ENTITY_CONFIG]: entity.config,
      [DOC.NAME_SPACE]: nameSpace,
      [DOC.URL]: url,
      [DOC.MANAGED]: managed,
      [DOC.ICON_URL]: icon,
      [DOC.ENTITY_FOLDER_ID]: folderId
    }
    res = new S6Doc(doc, file, "#PRIVATE");
    return res;
  }


  static _cacheName(docId, nameSpace = NO_NAME_SPACE) {
    var res = `NameSpace:${nameSpace} DocumentId:${docId}`;
    return res;
  }

  static _cacheCacheName(docId) {
    var res = `Cache DocumentId:${docId}`;
    return res;
  }

  static _getChachedDoc(documentId) {
    var res;
    var cacheCache = S6Cache.userCacheGetJson(S6Doc._cacheCacheName(documentId));
    var response;
    if (cacheCache && cacheCache[DOC_CACHE.CACHE_TIME]) {
      const time = cacheCache[DOC_CACHE.CACHE_TIME];
      const request =
      {
        "item_name": `items/${documentId}`,
        "page_size": 10,
        "filter": `detail.action_detail_case:MOVE AND time > ${time}`
      };
      //console.log(request);
      response = DriveActivity.Activity.query(request);
      if (!response.activities) {
        //console.log("Cache hit for document cache:", S6Doc._cacheCacheName(documentId));
        var json = S6Cache.userCacheGetJson(S6Doc._cacheName(documentId, cacheCache[DOC_CACHE.NAME_SPACE]));
        var file = DriveApp.getFileById(documentId);
        res = new S6Doc(json, file, "#PRIVATE");
      }
      else {
        console.info("Cache miss becuase the file has been moved:" + documentId);
      }
    }
    return res;

  }
  static _cacheCache(doc) {
    var json = {
      [DOC_CACHE.DOC_ID]: doc[DOC.DOC_ID],
      [DOC_CACHE.NAME_SPACE]: doc[DOC.NAME_SPACE],
      [DOC_CACHE.CACHE_TIME]: Date.now().toPrecision()
    }

    S6Cache.userCachePutJson(S6Doc._cacheCacheName(doc[DOC.DOC_ID]), json, CACHE_PRIORITY.LOW)
  }

  static newFromId(documentId, cache = true) {
    S6Validate.mandatory("documentId", documentId);
    var res;
    var nameSpace;
    var file;
    var folder;
    if (cache) {
      res = S6Doc._getChachedDoc(documentId);// S6Cache.userCacheGetJson(S6Doc._cacheName(documentId, json[INSTANCE.NAME_SPACE]));
    }
    if (!res) {
      var docMeta = S6Doc._getFolderMetaJson(documentId);
      nameSpace = docMeta.nameSpace;
      file = docMeta.file;
      folder = docMeta.folder;
      if (folder) {
        res = S6Doc._new(documentId, folder.getId(), file, nameSpace, docMeta.managed);
        S6Cache.userCachePutJson(S6Doc._cacheName(documentId, nameSpace), res.document);
        S6Doc._cacheCache(res.document);
      }
      else {
        res = S6Doc._newUnManaged(file);
        S6Cache.userCachePutJson(S6Doc._cacheName(documentId, NO_NAME_SPACE), res.document);
        S6Doc._cacheCache(res.document);
      }
    }
    return res;
  }

  static _getFolderMetaJson(documentId) {
    var res = {
      nameSpace: EMPTY,
      file: null,
      folder: folder,
      managed : YES
    };
    try {
      var folderIds = [];
      res.file = DriveApp.getFileById(documentId);
      var json;
      var folder;
      var folders;
      if (S6Utility.isFileFolder(res.file)) {
        folder = res.file;
      }
      else {
        folders = res.file.getParents();
      }
      while (folder || (folders && folders.hasNext())) {
        var next;
        if (folder) {
          next = folder;
          folder = null;
        }
        else {
          next = folders.next();
        }
        console.warn("Search for root folder", next.getName());
        json = S6Utility.getMetaDataFromFolder(next);
        if (json && json.hasOwnProperty(ADD_ON_NAME_FIELD) && json.hasOwnProperty(ADD_ON_VERSION_FIELD)) {
          // If the folder includes a SubFolder type then this is both old metadata (we used to store it on subfolders as well) and a sub folder.
          // The fact that is old metadata does not matter. But we want to ignore subfolders.
          if (!json.hasOwnProperty(INSTANCE_V11.FOLDER_TYPE) || json[INSTANCE_V11.FOLDER_TYPE] != "SubFolder") {
            try {
              if (!json.hasOwnProperty(INSTANCE.NAME_SPACE)) {
                console.warn("Having to find the name space for the folder:", next.getName());
                var master = S6Master.newMaster();
                var e = master.getEntityForOrginalConfigId(json[INSTANCE_V11.CONFIG_ID]);
                json["nameSpace"] = e["nameSpace"];
              }
              console.warn("Found metadata folder:", next.getName(), json);
              res.nameSpace = json["nameSpace"];
              res.folder = next;
              break;
            }
            catch (err) {
              console.error(err);
              console.warn("Does not contain valid metadata " + err)
            }
          }
        }
        folderIds[folderIds.length] = next.getId();
        //
        if (!res.folder) {
          folders = next.getParents()
        }
      }
    }
    catch (err) {
      console.error(err.stack);
      console.error(err);
      console.error("Invalid file for id:", documentId);
    }

    if (res.nameSpace == EMPTY) {
      res.managed = NO;
      var master = S6Master.newMaster();
      S6Context.debug("Search all folders for a root folder", master.rootFolders, folderIds);
      for (var k = 0; k < folderIds.length; k++) {
        S6Context.debug("Check folder", folderIds[k]);
        const tempNameSpace = master.getNameSpaceForFolderId(folderIds[k]);
        if (S6Utility.trim(tempNameSpace) != EMPTY) {
          S6Context.warn("Found ", tempNameSpace);
          const e = S6Entity.newFromNameSpace(tempNameSpace);
          if (e) {
            res.nameSpace = tempNameSpace;
            var depth = e.config[ENTITY.LIST_DEPTH];
            if (folderIds.length >= depth + 2) {
              S6Context.debug("Found root folder, going back up by:", depth - 2);
              var folderId = folderIds[folderIds.length - depth - 2]
              S6Context.debug("Found root folder, ", folderId);
              res.folder = S6DriveApp.getFolderById(folderId);
              res.managed = YES;
            }
            break;
          }
        }
      }
    }

    return res;
  }
}