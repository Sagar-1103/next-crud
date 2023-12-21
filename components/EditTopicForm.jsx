"use client"

import { useRouter } from "next/navigation";
import { useState } from "react"

export default function EditTopicForm({topic}) {
  const [title,setTitle] = useState(topic.title);
  const [description,setDescription] = useState(topic.description);
  const router = useRouter();
  // console.log(topic._id);
  const updateTopic = async(e)=>{
    console.log('HIi');
    e.preventDefault();
    try {
      console.log('HIi Dagar');
      const res = await fetch(`https://next-crud-fawn.vercel.app/api/topics/${topic._id}`,{
          method:"PUT",
          headers:{
              "Content-type":"application/json"
          },
          body:JSON.stringify({title,description}),
      });
      if (res.ok) {
          router.push("https://next-crud-fawn.vercel.app");
          router.refresh();
      } else{
          throw new Error("Failed to update a topic!");
      }
  } catch (error) {
      console.log("Error updating Topic",error);
  }
  }
  return (
    <div>
      <form onSubmit={updateTopic} className="flex flex-col gap-3">
            <input className="border border-slate-500 px-8 py-2" type="text" onChange={(e)=>setTitle(e.target.value)} value={title} placeholder="Topic Title" />
            <input className="border border-slate-500 px-8 py-2" type="text" onChange={(e)=>setDescription(e.target.value)} value={description} placeholder="Topic Description" />
            <button type="submit" className="bg-green-600 font-bold text-white py-3 px-6 w-fit" >Update Topic</button>
        </form>
    </div>
  )
}
