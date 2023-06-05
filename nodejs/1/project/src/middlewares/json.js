/*Middleware is function that will intercept our requisition, 
  the function will wait until the middleware finish all the structions
  and back to the requisition.
  They always receives the same structure, req and res like params */

export async function json(req, res){
  const buffers = []

  for await (const chunk of req){
    buffers.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())

  } catch (error) {
    req.body = null
  }
  
  res.setHeader('Content-type', 'application/json')
}