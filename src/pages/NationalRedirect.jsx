import { useEffect } from 'react'
export default function NationalRedirect({kind}) {
 const url=import.meta.env.BASE_URL+'national/'+(kind==='teacher'?'teachers':'register')+'.html'
 useEffect(()=>{window.location.replace(url)},[url])
 return <main className="container-page py-24"><a className="btn-primary" href={url}>افتح فورم التقديم →</a></main>
}
