import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Local backend server
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Mock data for development
const mockJobs = [
  {
    id: 1,
    title: 'Software Developer',
    company: 'Tech Solutions',
    location: 'Shimla',
    category: 'IT',
    description: 'Looking for an experienced software developer with React and Node.js skills.',
    requirements: 'At least 2 years of experience in web development.',
    contactInfo: 'hr@techsolutions.com',
    postedBy: '123',
    postedDate: '2025-07-10',
  },
  {
    id: 2,
    title: 'Hotel Manager',
    company: 'Mountain View Resort',
    location: 'Manali',
    category: 'Hospitality',
    description: 'Experienced hotel manager needed for a luxury resort in Manali.',
    requirements: 'At least 5 years of experience in hotel management.',
    contactInfo: 'careers@mountainview.com',
    postedBy: '124',
    postedDate: '2025-07-12',
  },
  {
    id: 3,
    title: 'Tour Guide',
    company: 'Himachal Explorers',
    location: 'Dharamshala',
    category: 'Tourism',
    description: 'Knowledgeable tour guide with excellent communication skills needed.',
    requirements: 'Knowledge of local culture and history. Fluency in Hindi and English.',
    contactInfo: 'jobs@himachalexplorers.com',
    postedBy: '125',
    postedDate: '2025-07-15',
  },
];

const mockServices = [
  {
    id: 1,
    title: 'Plumbing Services',
    provider: 'Raj Plumbers',
    location: 'Shimla',
    category: 'Plumbing',
    description: 'Professional plumbing services for residential and commercial properties.',
    contactInfo: 'raj@plumbers.com',
    postedBy: '126',
    rating: 4.8,
    postedDate: '2025-07-08',
  },
  {
    id: 2,
    title: 'Electrical Repairs',
    provider: 'Power Solutions',
    location: 'Mandi',
    category: 'Electrical',
    description: 'Certified electrician offering repair and installation services.',
    contactInfo: 'info@powersolutions.com',
    postedBy: '127',
    rating: 4.5,
    postedDate: '2025-07-14',
  },
  {
    id: 3,
    title: 'Tutoring - Mathematics',
    provider: 'Sharma Tutorials',
    location: 'Solan',
    category: 'Education',
    description: 'Experienced tutor for high school and college mathematics.',
    contactInfo: 'sharma@tutorials.com',
    postedBy: '128',
    rating: 4.9,
    postedDate: '2025-07-16',
  },
];

const mockComments = [
  {
    id: 1,
    text: 'This is a great opportunity!',
    userId: '123',
    userName: 'Test User',
    createdAt: '2025-07-17T10:30:00Z',
    postId: 1,
    postType: 'job'
  },
  {
    id: 2,
    text: 'I had a great experience with this service provider.',
    userId: '124',
    userName: 'Another User',
    createdAt: '2025-07-16T14:20:00Z',
    postId: 1,
    postType: 'service'
  }
];

// API functions
export const jobsApi = {
  // Get all jobs with optional filters
  getJobs: async (filters = {}) => {
    try {
      // Use real API
      const response = await api.get('/posts', { 
        params: { 
          ...filters,
          type: 'job'
        } 
      });
      
      return { 
        data: response.data.data, 
        success: true,
        pagination: response.data.pagination,
        count: response.data.count
      };
    } catch (error) {
      console.error('Error fetching jobs:', error);
      // Fallback to mock data if API is not available
      let filteredJobs = [...mockJobs];
      
      if (filters.location) {
        filteredJobs = filteredJobs.filter(job => 
          job.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }
      
      if (filters.category) {
        filteredJobs = filteredJobs.filter(job => 
          job.category.toLowerCase() === filters.category.toLowerCase()
        );
      }
      
      if (filters.search) {
        filteredJobs = filteredJobs.filter(job => 
          job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          job.description.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      return { data: filteredJobs, success: true };
    }
  },
  
  // Get a single job by ID
  getJobById: async (id) => {
    try {
      // Use real API
      const response = await api.get(`/posts/${id}`);
      return { data: response.data.data, success: true };
    } catch (error) {
      console.error(`Error fetching job ${id}:`, error);
      // Fallback to mock data if API is not available
      const job = mockJobs.find(job => job.id === parseInt(id));
      if (!job) {
        throw new Error('Job not found');
      }
      return { data: job, success: true };
    }
  },
  
  // Create a new job
  createJob: async (jobData) => {
    try {
      // Use real API
      const postData = {
        ...jobData,
        type: 'job'
      };
      const response = await api.post('/posts', postData);
      return { data: response.data.data, success: true };
    } catch (error) {
      console.error('Error creating job:', error);
      // Fallback to mock data if API is not available
      const newJob = {
        id: mockJobs.length + 1,
        ...jobData,
        postedDate: new Date().toISOString().split('T')[0]
      };
      mockJobs.push(newJob);
      return { data: newJob, success: true };
    }
  },
  
  // Update a job
  updateJob: async (id, jobData) => {
    try {
      // Use real API
      const response = await api.put(`/posts/${id}`, jobData);
      return { data: response.data.data, success: true };
    } catch (error) {
      console.error(`Error updating job ${id}:`, error);
      // Fallback to mock data if API is not available
      const index = mockJobs.findIndex(job => job.id === parseInt(id));
      if (index === -1) {
        throw new Error('Job not found');
      }
      
      mockJobs[index] = { ...mockJobs[index], ...jobData };
      return { data: mockJobs[index], success: true };
    }
  },
  
  // Delete a job
  deleteJob: async (id) => {
    try {
      // Use real API
      await api.delete(`/posts/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting job ${id}:`, error);
      // Fallback to mock data if API is not available
      const index = mockJobs.findIndex(job => job.id === parseInt(id));
      if (index === -1) {
        throw new Error('Job not found');
      }
      
      mockJobs.splice(index, 1);
      return { success: true };
    }
  }
};

export const servicesApi = {
  // Get all services with optional filters
  getServices: async (filters = {}) => {
    try {
      // Use real API
      const response = await api.get('/posts', { 
        params: { 
          ...filters,
          type: 'service'
        } 
      });
      
      return { 
        data: response.data.data, 
        success: true,
        pagination: response.data.pagination,
        count: response.data.count
      };
    } catch (error) {
      console.error('Error fetching services:', error);
      // Fallback to mock data if API is not available
      let filteredServices = [...mockServices];
      
      if (filters.location) {
        filteredServices = filteredServices.filter(service => 
          service.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }
      
      if (filters.category) {
        filteredServices = filteredServices.filter(service => 
          service.category.toLowerCase() === filters.category.toLowerCase()
        );
      }
      
      if (filters.search) {
        filteredServices = filteredServices.filter(service => 
          service.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          service.description.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      return { data: filteredServices, success: true };
    }
  },
  
  // Get a single service by ID
  getServiceById: async (id) => {
    try {
      // Use real API
      const response = await api.get(`/posts/${id}`);
      return { data: response.data.data, success: true };
    } catch (error) {
      console.error(`Error fetching service ${id}:`, error);
      // Fallback to mock data if API is not available
      const service = mockServices.find(service => service.id === parseInt(id));
      if (!service) {
        throw new Error('Service not found');
      }
      return { data: service, success: true };
    }
  },
  
  // Create a new service
  createService: async (serviceData) => {
    try {
      // Use real API
      const postData = {
        ...serviceData,
        type: 'service'
      };
      const response = await api.post('/posts', postData);
      return { data: response.data.data, success: true };
    } catch (error) {
      console.error('Error creating service:', error);
      // Fallback to mock data if API is not available
      const newService = {
        id: mockServices.length + 1,
        ...serviceData,
        postedDate: new Date().toISOString().split('T')[0],
        rating: 0 // New services start with no rating
      };
      mockServices.push(newService);
      return { data: newService, success: true };
    }
  },
  
  // Update a service
  updateService: async (id, serviceData) => {
    try {
      // Use real API
      const response = await api.put(`/posts/${id}`, serviceData);
      return { data: response.data.data, success: true };
    } catch (error) {
      console.error(`Error updating service ${id}:`, error);
      // Fallback to mock data if API is not available
      const index = mockServices.findIndex(service => service.id === parseInt(id));
      if (index === -1) {
        throw new Error('Service not found');
      }
      
      mockServices[index] = { ...mockServices[index], ...serviceData };
      return { data: mockServices[index], success: true };
    }
  },
  
  // Delete a service
  deleteService: async (id) => {
    try {
      // Use real API
      await api.delete(`/posts/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting service ${id}:`, error);
      // Fallback to mock data if API is not available
      const index = mockServices.findIndex(service => service.id === parseInt(id));
      if (index === -1) {
        throw new Error('Service not found');
      }
      
      mockServices.splice(index, 1);
      return { success: true };
    }
  }
};

export const commentsApi = {
  // Get comments for a post
  getComments: async (postId, postType) => {
    try {
      // Use real API
      const response = await api.get(`/posts/${postId}/comments`);
      return { data: response.data.data, success: true };
    } catch (error) {
      console.error('Error fetching comments:', error);
      // Fallback to mock data if API is not available
      const comments = mockComments.filter(
        comment => comment.postId === parseInt(postId) && comment.postType === postType
      );
      return { data: comments, success: true };
    }
  },
  
  // Add a comment
  addComment: async (commentData) => {
    try {
      // Use real API
      const response = await api.post(`/posts/${commentData.postId}/comments`, {
        text: commentData.text
      });
      return { data: response.data.data, success: true };
    } catch (error) {
      console.error('Error adding comment:', error);
      // Fallback to mock data if API is not available
      const newComment = {
        id: mockComments.length + 1,
        ...commentData,
        createdAt: new Date().toISOString()
      };
      mockComments.push(newComment);
      return { data: newComment, success: true };
    }
  },
  
  // Update a comment
  updateComment: async (id, text) => {
    try {
      // Use real API - need to find the post ID for this comment
      const comment = mockComments.find(c => c.id === parseInt(id));
      if (!comment) {
        throw new Error('Comment not found in local cache');
      }
      
      const response = await api.put(`/posts/${comment.postId}/comments/${id}`, { text });
      return { data: response.data.data, success: true };
    } catch (error) {
      console.error(`Error updating comment ${id}:`, error);
      // Fallback to mock data if API is not available
      const index = mockComments.findIndex(comment => comment.id === parseInt(id));
      if (index === -1) {
        throw new Error('Comment not found');
      }
      
      mockComments[index] = { 
        ...mockComments[index], 
        text,
        updatedAt: new Date().toISOString()
      };
      return { data: mockComments[index], success: true };
    }
  },
  
  // Delete a comment
  deleteComment: async (id) => {
    try {
      // Use real API - need to find the post ID for this comment
      const comment = mockComments.find(c => c.id === parseInt(id));
      if (!comment) {
        throw new Error('Comment not found in local cache');
      }
      
      await api.delete(`/posts/${comment.postId}/comments/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting comment ${id}:`, error);
      // Fallback to mock data if API is not available
      const index = mockComments.findIndex(comment => comment.id === parseInt(id));
      if (index === -1) {
        throw new Error('Comment not found');
      }
      
      mockComments.splice(index, 1);
      return { success: true };
    }
  }
};

export default api;