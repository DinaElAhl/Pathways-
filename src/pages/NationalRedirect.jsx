import { useEffect } from 'react'
export default function NationalRedirect({kind}) {
 const file={teacher:'teachers',booklets:'booklets',november:'booklets'}[kind]||'register'
 const url=import.meta.env.BASE_URL+'national/'+file+'.html'+(kind==='november'?'#november':'')
 useEffect(()=>{window.location.replace(url)},[url])
 return <main className="container-page py-24"><a className="btn-primary" href={url}>{kind==='booklets'||kind==='november'?'افتح صفحة الملازم →':'افتح فورم التقديم →'}</a></main>
}
