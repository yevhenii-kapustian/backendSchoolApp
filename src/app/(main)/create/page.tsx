import CreatePostForm from "./CreatePostForm"

const CreatePage = () => {
  return(
    <section className="w-330 my-10 m-auto px-4 max-[1355px]:w-full">
      <h1 className="mb-5 text-4xl text-[#02282CFF] font-bold">Create Post</h1>
      <CreatePostForm/>
    </section>
  )
}

export default CreatePage
