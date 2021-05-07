import Swal from 'sweetalert2'

function Success(text){
  Swal.fire({
    text: text,
    icon: 'success',
    confirmButtonText: 'OK',
    timer: 1000
  })
}

function Warning(text){
  Swal.fire({
    text: text,
    icon: 'warning',
    confirmButtonText: 'OK'
  })
}

function Error(){
  Swal.fire({
    text: '发生了错误',
    icon: 'error',
    confirmButtonText: 'OK'
  })
}

function DeleteAPI(){
  Swal.fire({
    title: '你确定删除吗？',
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: "取消"
  }).then((result) => {
    if (result.isConfirmed) {
      //
      Swal.fire({
        title:'删除成功', 
        icon:'success',
        timer: 1500
      })
    } else if (result.isDenied) {
      Swal.close()
    }
  })
}

export default {Success,Error,Warning,DeleteAPI}
