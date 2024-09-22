import '../app/globals.css';
export async function getServerSideProps() {
    try {
        const res = await fetch('http://localhost:3000/api/posts')
        const posts = await res.json()

        return {
            props: {posts}
        };
    } catch(error) {
       console.log("Failed to fetch posts:", error);
       return {
        props: {posts: []}
       };
    }
}

export default function PostsPage(props) {
    return(
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8">Blog Posts</h1>
            <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {
                    props.posts.map(post => (
                        <li key={post.id} className="bd-white rounded shadow-md overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>
                            <p className="text-gray-700 mb-4">{post.content}</p>
                            <small className="tex-gray-500">{new Date(post.date).toLocaleDateString('en-US',{day:'numeric' , month:'long', year:'numeric'})}</small>
                        </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}