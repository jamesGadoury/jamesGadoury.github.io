from argparse import ArgumentParser
from pathlib import Path
from shutil import copytree, rmtree

import frontmatter
import markdown
from jinja2 import Environment, FileSystemLoader


def main(posts_dir: Path, templates_dir: Path, static_dir: Path, output_dir: Path):
    if output_dir.exists():
        rmtree(output_dir)

    output_dir.mkdir(parents=True, exist_ok=True)
    dest_static = output_dir / static_dir.name
    copytree(static_dir, dest_static, dirs_exist_ok=True)

    jinja_env = Environment(loader=FileSystemLoader(templates_dir), autoescape=True)

    posts = []
    for fn in sorted(posts_dir.iterdir()):
        if fn.suffix != ".md":
            continue
        post = frontmatter.load(str(fn))
        html = markdown.markdown(post.content, extensions=["fenced_code", "codehilite"])
        meta = post.metadata
        slug = fn.stem
        posts.append({"slug": slug, "meta": meta, "content": html})

    for template in ["index.html", "about.html"]:
        html = jinja_env.get_template(template).render(
            posts=posts, site_title="James Gadoury"
        )
        with open(output_dir / template, "w") as f:
            f.write(html)

    post_tmpl = jinja_env.get_template("post.html")
    for p in posts:
        slug = p["slug"]
        with open(output_dir / f"{slug}.html", "w") as f:
            f.write(post_tmpl.render(post=p, site_title="James Gadoury"))

    print(f"✅  Site generated into ./{output_dir}/")


if __name__ == "__main__":
    cli = ArgumentParser()

    cli.add_argument("--posts-dir", type=Path, default=Path("./posts"))
    cli.add_argument("--templates-dir", type=Path, default=Path("./templates"))
    cli.add_argument("--static-dir", type=Path, default=Path("./static"))
    cli.add_argument("--output-dir", type=Path, default=Path("./dist"))

    args = cli.parse_args()

    main(
        posts_dir=args.posts_dir,
        templates_dir=args.templates_dir,
        static_dir=args.static_dir,
        output_dir=args.output_dir,
    )
