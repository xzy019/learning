import instance from '../http'

const Comment = {
  getComment: function (page,size,id){
    return instance({
      url: '/Comment/Get',
      method: 'get', // post、put、delete、
      params: {
        page: page,
        size: size,
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
  createComment: function(noteid,text){
    return instance({
      url: '/Comment/Create',
      method: 'post', // post、put、delete、
      params: {
        comment: text,
        id: noteid
      },
    })
    .then(res=> {
      return res;
    })
    .catch(err=> {
      return err;
    });
  },
}

export default Comment