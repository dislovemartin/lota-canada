const fetch = require('node-fetch');

async function setupLOTALLM() {
  console.log('Setting up LOTA-LLM...');
  
  try {
    // Step 1: Try to register a user
    console.log('Attempting to register a user...');
    const registerResponse = await fetch('http://localhost:2000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'password123',
        role: 'admin',
      }),
    });
    
    const registerData = await registerResponse.text();
    console.log('Register response:', registerData);
    
    // Step 2: Try to login
    console.log('Attempting to login...');
    const loginResponse = await fetch('http://localhost:2000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'password123',
      }),
    });
    
    const loginData = await loginResponse.text();
    console.log('Login response:', loginData);
    
    // Step 3: Try to create a workspace
    console.log('Attempting to create a workspace...');
    const createWorkspaceResponse = await fetch('http://localhost:2000/api/workspaces', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(loginData)?.token || 'no-token'}`,
      },
      body: JSON.stringify({
        name: 'LOTA Knowledge Base',
        description: 'Knowledge base for LOTA Canada',
      }),
    });
    
    const workspaceData = await createWorkspaceResponse.text();
    console.log('Create workspace response:', workspaceData);
    
    // Step 4: Try to enable embedding for the workspace
    console.log('Attempting to enable embedding for the workspace...');
    const workspaceId = JSON.parse(workspaceData)?.workspace?.id || 'no-id';
    const enableEmbeddingResponse = await fetch(`http://localhost:2000/api/workspaces/${workspaceId}/embedding`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(loginData)?.token || 'no-token'}`,
      },
      body: JSON.stringify({
        enabled: true,
      }),
    });
    
    const embeddingData = await enableEmbeddingResponse.text();
    console.log('Enable embedding response:', embeddingData);
    
    console.log('LOTA-LLM setup complete!');
  } catch (error) {
    console.error('Error setting up LOTA-LLM:', error);
  }
}

setupLOTALLM(); 