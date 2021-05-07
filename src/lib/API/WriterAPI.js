import instance from '../http'

const Writer = {
  getWriter: function (){
    return instance({
      url: '/Writer/Get',
      method: 'get',
    })
    .then(res=> {
      return res;
    })
    .catch(err=> {
      return err;
    });
  },
  editWriter:function(nickname,sex,telnumber){
    return instance({
      url: '/Writer/Edit',
      method: 'put', // post、put、delete、
      params: {
        nickname: nickname,
        sex: sex,
        telnumber: telnumber
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

export default Writer