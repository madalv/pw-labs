import socket
import ssl
from bs4 import BeautifulSoup
import sys

def split_url(url):
    url_no_protocol = url.replace("https://", "")
    ix = url_no_protocol.find("/")
    return url_no_protocol[:ix], url_no_protocol[ix:]

def init_socket_conn(host, port):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    context = ssl.SSLContext(ssl.PROTOCOL_TLS)
    ssl_sock = context.wrap_socket(sock, server_hostname=host)
    ssl_sock.connect((host, port))
    return ssl_sock


def get_content(url):
    print(url)
    host, path = split_url(url)
    socket = init_socket_conn(host, 443)

    request = f"GET {path} HTTP/1.1 \r\nHost: {host} \r\nConnection: keep-alive \r\n\r\n"
    socket.sendall(request.encode("ascii"))
    headers, body = socket.recv(4096).decode(), socket.recv(4096).decode()

    soup = BeautifulSoup(body, "html.parser")
    print(soup.get_text())


if __name__ == "__main__":
    get_content(sys.argv[1])
