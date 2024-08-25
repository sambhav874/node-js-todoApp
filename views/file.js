async function fetchingTodos(){
    const response = await fetch('/api/todos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            }
        
    });

    return response;
    
}