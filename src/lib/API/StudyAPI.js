import instance from '../http'

const Study = {
  getStudy: function (page,size){
    return instance({
      url: '/StudyInfo/Get',
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
  createStudy: function(studytime, type){
    return instance({
      url: '/StudyInfo/Create',
      method: 'post', // post、put、delete、
      params: {
        studytime: studytime,
        type: type
      },
    })
    .then(res=> {
      return res;
    })
    .catch(err=> {
      return err;
    });
  },
  editStudy:function(id,studytime,type){
    return instance({
      url: '/StudyInfo/Edit',
      method: 'put', // post、put、delete、
      params: {
        id: id,
        studytime: studytime,
        type: type
      },
    })
    .then(res=> {
      return res;
    })
    .catch(err=> {
      return err;
    });
  },
  deleteStudy: function(id){
    return instance({
      url: '/StudyInfo/Delete',
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

export default Study