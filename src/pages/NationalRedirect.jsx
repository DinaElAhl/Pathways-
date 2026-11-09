import { useEffect } from 'react'
export default function NationalRedirect({kind}) {
 const file={teacher:'teachers',booklets:'booklets'}[kind]||'register'
 const url=import.meta.env.BASE_URL+'national/'+file+'.html'
 useEffect(()=>{window.location.replace(url)},[url])
 return <main className="container-page py-24"><a className="btn-primary" href={url}>{kind==='booklets'?'افتح صفحة الملازم →':'افتح فورم التقديم →'}</a></main>
}
