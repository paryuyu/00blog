'use client';
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { Monoton, ZCOOL_KuaiLe } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import NavBlogMenu from "./NavBlogMenu";
const ZCOOLKuaiLe = ZCOOL_KuaiLe({ subsets: ['latin'], weight: "400" });
const MonotonFont = Monoton({ subsets: ['latin'], weight: "400" });


const Nav = () => {
  const [providers, setProviders] = useState(null);
  const { data: session } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState(false);
  const [blogs, setBlogs] = useState([]);

  async function getBlogs() {
    console.log('start-fetch')
    if (session) {
      let response = await axios.get("/api/blog/" + session?.user.email);
      if (response.status === 200) {
        setBlogs(response?.data)
      }
    }
  }


  useEffect(() => {
    //provider 얻어오기
    const setUpProvider = async () => {
      const res = await getProviders();
      setProviders(res);
    }
    setUpProvider();


  }, [])

  useEffect(() => {
    getBlogs();
  }, [session])

  const handleSignIn = () => {
    signIn(providers.id)
  }

  const handleSignOut = () => {
    signOut()
  }

  const handleWriteNavigation = () => {
    router.push("/write")
  }

  const handleOpen = () => {
    setProfile(c => !c)
  }

  const handleManage = () => {
    const userId = session?.user.email.split('@')[0]
    if (userId) {
      router.push(`/${userId}/manage`);
      setProfile(c => !c);
    }
  }

  return (
    <nav >
      <h1 className="blue_gradient logo_text ">
        <Link href={"/"} className={MonotonFont.className}>00BLOG</Link>
      </h1>

      {session?.user ?
        <div className="login_profile_block">
          <button className="gradient_btn desktop_btn" onClick={handleWriteNavigation}>Write</button>
          <button className="outline_btn desktop_btn" onClick={handleSignOut}>Sign Out</button>
          <Image
            className="profile"
            src={session?.user.image}
            width={40}
            height={20}
            onClick={handleOpen}
            alt="profile" />

        </div>
        :
        <div>
          <button className="fill_btn" onClick={handleSignIn}>Sign in</button>
        </div>}

      {profile && session &&
        <div className="nav-menu">
          <div className="user-manage nav-menu-elm" onClick={handleManage}>
            <span className="menu-user-text">{session?.user.email}</span>
            <span className="menu-user-text">{session?.user.name}</span>
          </div>
          <div>
            {blogs.length !== 0 && blogs?.map((item) => {
              return <NavBlogMenu item={item} key={item._id} onClose={handleOpen}/>
            })}
          </div>
        </div>}

    </nav>
  )
}

export default Nav;