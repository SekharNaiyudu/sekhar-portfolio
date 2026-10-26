
from flask import Flask, render_template, Response

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/sitemap.xml")
def sitemap():
    xml = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://sekhar-portfolio-psi.vercel.app/</loc>
    </url>
</urlset>"""
    return Response(xml, mimetype="application/xml")


@app.route("/robots.txt")
def robots():
    content = """User-agent: *
Allow: /
Sitemap: https://sekhar-portfolio-psi.vercel.app/sitemap.xml
"""
    return Response(content, mimetype="text/plain")


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
