import instance from '../http'

const List = {
  getList: function (page,size){
    return instance({
      url: '/ListInfo/Get',
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
  createList: function(title,level){
    return instance({
      url: '/ListInfo/Create',
      method: 'post', // post、put、delete、
      params: {
        title: title,
        level: level
      },
    })
    .then(res=> {
      return res;
    })
    .catch(err=> {
      return err;
    });
  },
  editList:function(id){
    return instance({
      url: '/ListInfo/Edit',
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
  },
  deleteList: function(id){
    return instance({
      url: '/ListInfo/Detele',
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
  }
}

export default List