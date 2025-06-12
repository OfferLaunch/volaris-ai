from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

class CustomHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        # Remove .html extension from the path
        if self.path.endswith('/'):
            self.path += 'index.html'
        elif not os.path.exists(self.path[1:]) and not self.path.endswith('.html'):
            # Try adding .html extension if the file doesn't exist
            if os.path.exists(self.path[1:] + '.html'):
                self.path += '.html'
        return SimpleHTTPRequestHandler.do_GET(self)

def run(server_class=HTTPServer, handler_class=CustomHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"Starting server on port {port}...")
    httpd.serve_forever()

if __name__ == '__main__':
    run() 