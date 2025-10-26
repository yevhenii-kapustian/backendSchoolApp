import CreatePostForm from "./CreatePostForm"

const CreatePage = () => {
  return(
    <section className="w-330 m-auto max-[1355px]:w-full">
      <h1 className="mb-5 text-4xl font-bold">Create Post</h1>
      <CreatePostForm/>
    </section>
  )
}

export default CreatePage
