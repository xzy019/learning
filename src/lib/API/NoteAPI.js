import instance from '../http'

const Note = {
  getNoteAll: function (page,size){
    return instance({
      url: '/NoteInfo/NotePageAll',
      method: 'get', // post、put、delete、
      params: {
        page: page,
        size: size
      },
    })
    .then(res=> {
      return res;
    })
    .catch(err=> {
      return err;
    });
  },
  getNoteTag: function (tag,page,size){
    return instance({
      url: '/NoteInfo/NotePageTag',
      method: 'get', // post、put、delete、
      params: {
        page:page,
        size:size,
        tag: tag
      },
    })
    .then(res=> {
      return res;
    })
    .catch(err=> {
      return err;
    });
  },
  getNoteSelf: function (page,size){
    return instance({
      url: '/NoteInfo/NotePage',
      method: 'get', // post、put、delete、
      params: {
        page: page,
        size: size
      },
    })
    .then(res=> {
      return res;
    })
    .catch(err=> {
      return err;
    });
  },
  getNoteID: function (id){
    return instance({
      url: '/NoteInfo/NoteID',
      method: 'get', // post、put、delete、
      params: {
        id: id
      },
    })
    .then(res=> {
      return res;
    })
    .catch(err=> {
      return err;
    });
  },
  createNote: function(title,text,tag){
    return instance({
      url: '/NoteInfo/Create',
      method: 'post', // post、put、delete、
      params: {
        title: title,
        content: text,
        tag: tag
      },
    })
    .then(res=> {
      return res;
    })
    .catch(err=> {
      return err;
    });
  },
  editNote:function(id,title,text,tag){
    return instance({
      url: '/NoteInfo/Edit',
      method: 'put', // post、put、delete、
      params: {
        id: id,
        title: title,
        content: text,
        tag: tag
      },
    })
    .then(res=> {
      return res;
    })
    .catch(err=> {
      return err;
    });
  },
  deleteNote: function(id){
    return instance({
      url: '/NoteInfo/Detele',
      method: 'delete', // post、put、delete、
      params: {
        id: id
      },
    })
    .then(res=> {
      return res;
    })
    .catch(err=> {
      return err;
    });
  },
  likeNote: function(id){
    return instance({
      url: '/NoteInfo/Like',
      method: 'put', // post、put、delete、
      params: {
        id: id
      },
    })
    .then(res=> {
      return res;
    })
    .catch(err=> {
      return err;
    });
  }
}

export default Note