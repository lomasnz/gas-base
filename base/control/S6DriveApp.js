/**
 * Used insread of the DriveApp to cache elements to speed up exdcution.
 * Items cached are 
 * Folder
 * Folder::getName
 * folder::GetDescription
 */
class S6DriveApp {

  static createFolder(name, onFolder) {
    var res;
    if (onFolder) {
      res = onFolder.createFolder(name);
    }
    else {
      res = DriveApp.createFolder(name);
    }
    S6DriveApp._decorateFolder(res);
    S6DriveApp._putToCache(res.getId(), "folder", res);
    return res;
  }

  static createNewFolder(name, onFolder) {
    var res;
    if (!onFolder) {
      onFolder = DriveApp;
    }
    var folders = onFolder.getFoldersByName(name);
    if (!folders.hasNext()) {
      res = onFolder.createFolder(name);
    }
    else {
      S6Context.debugFn(S6DriveApp.createNewFolder, "Folder exists not created:", name);
      res = folders.next();
    }

    S6DriveApp._decorateFolder(res);
    S6DriveApp._putToCache(res.getId(), "folder", res);
    return res;
  }
  /**
   * Provide a path in the format of <folder><seperator><folder> and the folders will be created, starting at the supplied onFolder.
   * If folderPathIncludesFile is true then the last part of the path is assumed to be a file, and is ignored.
   * For example 
   *      folderPath = top\next\bottom\file
   *      folderPathIncludesFile = true
   * Will result in the following folders being created
   *      top
   *      next
   *      bottom
   * The result is an arry of all the folders created in the oder (from top to bottom) they are created in. 
   * If folderPathIncludesFile is true then the last value of the array is a string of the file name left at the end.
   *  
   */
  static createFolders(folderPath, onFolder, folderPathIncludesFile = false) {
    var res = [];
    var split = folderPath.split(FOLDER_SEPERATOR);
    let x = 0;
    var length = folderPathIncludesFile ? split.length - 1 : split.length;
    for (var i = 0; i < length; i++) {
      res[x++] = onFolder;
      onFolder = S6DriveApp.createNewFolder(split[i], onFolder);
    }
    res[x] = onFolder;
    if (folderPathIncludesFile) {
      res[x + 1] = split[length];
    }
    return res;
  }

  static getFolderById(id) {
    var res = S6DriveApp._getFromCache(id, "folder");
    if (!res) {
      S6Context.trace("getFolderById:", "Memory cache miss for id:",id);
      res = DriveApp.getFolderById(id);
      S6DriveApp._decorateFolder(res,id);
      S6DriveApp._putToCache(id, "folder", res);
      S6DriveApp._count(id, "folder");
    }
    else {
      res = res.value;
      S6DriveApp._count(id, "folder");
      S6Context.trace("getFolderById:", "Memory cache hit");
    }
    S6Context.trace("exit");
    return res;
  }
  static getFoldersByName(name) {
    var res = DriveApp.getFoldersByName(name);
    S6DriveApp._decorateFolderIterator(res);
    return res;
  }
  static getFolderName(id) {
    var res = S6DriveApp._getFromCache(id, "name");
    if (!res) {
      S6Context.trace("getFolderName:", "Memory cache miss");
      var folder = S6DriveApp.getFolderById(id);
      S6Context.trace("getFolderName:",folder);
      res = folder._orignalGetName();
      S6DriveApp._putToCache(id, "name", res);
      S6DriveApp._count(id, "name");
    }
    else {
      res = res.value;
      S6DriveApp._count(id, "name");
      S6Context.trace("getFolderName:", "Memory cache hit");
    }
    return res;
  }
  static getFolderDescription(id) {
    var res = S6DriveApp._getFromCache(id, "desc");
    if (!res) {
      S6Context.trace("getFolderDescription", "Memory cache miss");
      var folder = S6DriveApp.getFolderById(id);
      res = folder._orignalGetDescription();
      S6DriveApp._putToCache(id, "desc", res);
      S6DriveApp._count(id, "desc");
    }
    else {
      res = res.value;
      S6DriveApp._count(id, "desc");
      S6Context.trace("getFolderDescription", "Memory cache hit");
    }
    return res;
  }

  static _count(id, name) {
    var item = id + ":" + name;
    S6Context.trace("_count", item);
    if (S6DriveApp._getCacheStats()[item]) {
      var hitCount = S6DriveApp._getCacheStats()[item].hitCount + 1;
      S6DriveApp._getCacheStats()[item] = { hitCount: hitCount };
    }
    else {
      S6DriveApp._getCacheStats()[item] = { hitCount: 0 };
    }
  }

  static cacheStats() {
    return S6DriveApp._getCacheStats();
  }

  static _getCache() {
    if (typeof S6DriveApp.memoryCache == 'undefined') {
      S6DriveApp.memoryCache = {};
    }
    return S6DriveApp.memoryCache;
  }
  static _getCacheStats() {
    if (typeof S6DriveApp.memoryCacheStats == 'undefined') {
      S6DriveApp.memoryCacheStats = {};
    }
    return S6DriveApp.memoryCacheStats;
  }

  static _getFromCache(id, name) {
    return S6DriveApp._getCache()[ id + ":" + name];
    // var res;
    // var lookup = id + ":" + name;
    // var item = S6DriveApp._getCache()[lookup];
    // if (item) {
    //   res = item.value;
    //   S6Context.debug("Cache hit: ", lookup, res);
    // }
    // return res;
  }
  static _putToCache(id, name, item = EMPTY) {
    //S6Context.trace("_putToCache",id + ":" + name,":", item);
    return S6DriveApp._getCache()[id + ":" + name] = { value: item, present: true };
  }

  static _decorateFolder(folder, id = folder.getId()) {
    if (!folder._decoratedByS6DriveApp) {
      folder._orignalGetName = folder.getName;
      folder._orignalGetFolders = folder.getFolders;
      folder._orignalGetDescription = folder.getDescription;
      folder._orignalGetParents = folder.getParents;
      folder._orignalGetFoldersByName = folder.getFoldersByName;
      folder._orginalCreateFolder = folder.createFolder
      folder._decoratedByS6DriveApp = true;
      folder._id = id;

      folder.getId = S6DriveApp._FolderGetId;
      folder.getDescription = S6DriveApp._FolderGetDescription;
      folder.getName = S6DriveApp._FolderGetName;
      folder.getFolders = S6DriveApp._FolderGetFolders;
      folder.getParents = S6DriveApp._FolderGetParents;
      folder.getFoldersByName = S6DriveApp._FolderGetFoldersByName;
      folder.createFolder = S6DriveApp._FolderCreateFolder;

      folder.setParentFolder = S6DriveApp._FolderSetParent;
      folder.getParentFolder = S6DriveApp._FolderGetParent;

    }
  }
  static _decorateFolderIterator(folderIterator) {
    folderIterator._orignalNext = folderIterator.next;

    folderIterator.next = S6DriveApp._FolderIteratorNext;
  }

  static _FolderGetId() {
    S6DriveApp._count(this._id, "id");
    return this._id;
  }
  static _FolderGetName() {
    return S6DriveApp.getFolderName(this.getId());
  }


  static _FolderGetDescription() {
    //S6Context.debug("_FolderGetDescription");
    return S6DriveApp.getFolderDescription(this.getId());
  }
  static _FolderGetFolders() {
    var res = this._orignalGetFolders();
    S6DriveApp._decorateFolderIterator(res);
    return res;
  }

  static _FolderCreateFolder(name) {
    var res = this._orginalCreateFolder(name);
    S6DriveApp._decorateFolder(res);
    S6DriveApp._putToCache(res.getId(), "folder", res);
    return res;
  }

  static _FolderGetParents() {
    var res = this._orignalGetParents();
    S6DriveApp._decorateFolderIterator(res);
    return res;

  }
  static _FolderGetFoldersByName(name) {
    var res = this._orignalGetFoldersByName(name);
    S6DriveApp._decorateFolderIterator(res);
    return res;
  }

  static _FolderIteratorNext() {
    var res = this._orignalNext();
    S6DriveApp._decorateFolder(res);
    S6DriveApp._putToCache(res.getId(), "folder", res);
    S6DriveApp._count(res.getId(), "id");
    return res;
  }

  static _FolderSetParent(parentFolder) {
    S6DriveApp._decorateFolder(parentFolder);
    var id = this.getId();
    S6DriveApp._putToCache(id, "parentFolder", parentFolder);
    S6Context.debugFn("_FolderSetParent", parentFolder);
  }
  static _FolderGetParent() {
    var id = this.getId();
    var res = S6DriveApp._getFromCache(id, "parentFolder");
    if (!res) {
      var ps = this.getParents();
      if (ps && ps.hasNext) {
        res = ps.next();
        S6DriveApp._putToCache(id, "parentFolder", res);
      }
    }
    else {
      res = res.value;
    }
    S6DriveApp._count(id, "parentFolder");
    S6Context.debugFn("_FolderGetParent", res);
    return res;
  }

  static getFoldersAtDepth(folder, depth, lastDepth = 0) {
    S6Context.trace("getFoldersAtDepth(folder:", folder.getName(), ",", depth, ",", lastDepth, ")");
    S6DriveApp._decorateFolder(folder);
    var res = [];
    if (lastDepth == depth) {
      var iterator = folder.getFolders();
      var i = 0;
      while (iterator.hasNext()) {
        res[i++] = iterator.next();
        res[i-1].setParentFolder(folder);
      }
    }
    else {
      var iterator = folder.getFolders();
      var resCount = 0;
      while (iterator.hasNext()) {
        var nextFolder = iterator.next();
        S6Context.trace("Next folder:" + nextFolder.getName());
        var ary = S6DriveApp.getFoldersAtDepth(nextFolder, depth, lastDepth + 1);
        for (var a = 0; a < ary.length; a++) {
          S6Context.trace("Next Item:", ary[a].getName());
          res[resCount++] = ary[a];
        }
      }
    }
    return res;
  }

























}

