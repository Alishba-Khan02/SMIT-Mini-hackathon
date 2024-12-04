
const loggedInUserEmail = ("");  
const loggedInUser = {
    id: 0,
    name: loggedInUserEmail.split('@')[0] 
};

  

let posts = [
    { id: 1, title: "AI ", author: "Ali", description: "Exploring the latest in AI.", category: "AI", userId: 1 },
    { id: 2, title: "Political News", author: "Sara", description: "Breaking political developments.", category: "Politics", userId: 2 },
    { id: 3, title: "AI ", author: "Owais", description: "Exploring the latest in AI.", category: "AI", userId: 3 },
    { id: 4, title: "Educational News", author: "Sana", description: "Educational developments.", category: "Education", userId: 4 },
];



// References to DOM elements
const addPostBtn = document.getElementById('addPostBtn');
const postModal = document.getElementById('postModal');
const postForm = document.getElementById('postForm');
const postsBody = document.getElementById('postsBody');
const modalTitle = document.getElementById('modalTitle');
const cancelBtn = document.getElementById('cancelBtn');
const postTitle = document.getElementById('postTitle');
const postAuthor = document.getElementById('postAuthor');
const postDescription = document.getElementById('postDescription');
const postCategory = document.getElementById('postCategory');
const categoryFilter = document.getElementById('categoryFilter');
const postAuthorInput = document.getElementById('postAuthor'); 
let currentEditIndex = null;

// Show Modal
const showModal = (isEdit = false, index = null) => {
    postModal.classList.remove('hidden');
    modalTitle.textContent = isEdit ? 'Edit Post' : 'Add New Post';
    currentEditIndex = index;

    // Set the author to the logged-in user
    postAuthorInput.value = loggedInUser.name; 

    if (isEdit && index !== null) {
        const post = posts[index];
        if (post.userId === loggedInUser.id) {
            postTitle.value = post.title;
            postAuthor.value = post.author;
            postDescription.value = post.description;
            postCategory.value = post.category;
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Unauthorized',
                text: 'You cannot edit someone else\'s post.',
            });
            hideModal();
        }
    } else {
        postForm.reset();
    }
};

// Hide Modal
const hideModal = () => {
    postModal.classList.add('hidden');
};

// Render Posts
const renderPosts = (filteredPosts = null) => {
    const postsToRender = filteredPosts || posts;
    postsBody.innerHTML = '';
    postsToRender.forEach((post, index) => {
        const isOwnPost = post.userId === loggedInUser.id;
        postsBody.innerHTML += `
            <tr class="hover:bg-gray-100">
                <td class="border border-gray-300 px-4 py-2">${index + 1}</td>
                <td class="border border-gray-300 px-4 py-2">${post.title}</td>
                <td class="border border-gray-300 px-4 py-2">${post.author}</td>
                <td class="border border-gray-300 px-4 py-2">${new Date().toISOString().split('T')[0]}</td>
                <td class="border border-gray-300 px-4 py-2">${new Date().toLocaleString('default', { month: 'long' })}</td>
                <td class="border border-gray-300 px-4 py-2">${post.category}</td>
                <td class="border border-gray-300 px-4 py-2">${post.description}</td>
                ${isOwnPost ? `
                    <td class="border border-gray-300 px-4 py-2">
                        <button class="text-blue-600" onclick="showModal(true, ${index})">Edit</button>
                        <button class="text-red-600 ml-2" onclick="deletePost(${index})">Delete</button>
                    </td>` : ''}
            </tr>
        `;
    });
};

// Filter posts by category
const filterPostsByCategory = () => {
    const selectedCategory = categoryFilter.value;
    if (selectedCategory) {
        const filteredPosts = posts.filter(post => post.category === selectedCategory);
        renderPosts(filteredPosts);
    } else {
        renderPosts(); // Show all posts if no category is selected
    }
};

// Event Listener for Category Filter
categoryFilter.addEventListener('change', filterPostsByCategory);

// Add/Edit Post
postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newPost = {
        title: postTitle.value,
        author: loggedInUser.name, // The logged-in user's name
        description: postDescription.value,
        category: postCategory.value,
        userId: loggedInUser.id,  // Ensure the post is associated with the logged-in user
    };

    if (currentEditIndex !== null) {
        posts[currentEditIndex] = newPost;
        Swal.fire({
            icon: 'success',
            title: 'Post Updated',
            text: 'Your post has been updated successfully.',
            timer: 2000,
        });
    }
     else {
        posts.push(newPost);
        Swal.fire({
            icon: 'success',
            title: 'Post Added',
            text: 'Your new post has been added successfully.',
            timer: 2000,
        });
    }

    renderPosts();
    hideModal();
});

// Delete Post with SweetAlert confirmation
const deletePost = (index) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
        if (result.isConfirmed) {
            posts.splice(index, 1);
            Swal.fire(
                'Deleted!',
                'Your post has been deleted.',
                'success'
            );
            renderPosts();
        }
    });
};

// Event Listeners
addPostBtn.addEventListener('click', () => showModal(false));
cancelBtn.addEventListener('click', hideModal);

// Initialize the page with all posts
renderPosts();
// Logout button click event
const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', () => {
    
    Swal.fire({
        title: 'Are you sure?',
        text: 'You will be logged out!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, log me out',
        cancelButtonText: 'No, cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            // Simulate logout (clear session or token in real-world applications)
            // Redirect to index.html after confirming logout
            Swal.fire({
                title: 'Logged Out',
                text: 'You have successfully logged out.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                // Redirect to index.html
                window.location.href = 'index.html';
            });
        }
    });
});


    