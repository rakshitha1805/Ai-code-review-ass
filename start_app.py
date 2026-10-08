import os
import sys
import webbrowser
import time
import subprocess

def main():
    print("=" * 60)
    print("  [CODEGUARD AI] All-in-One Application Launcher")
    print("=" * 60)

    project_root = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.join(project_root, "backend")
    frontend_dist = os.path.join(project_root, "frontend", "dist")

    # 1. Seed Database if needed
    print("\n[1/3] Checking and seeding database...")
    sys.path.insert(0, backend_dir)
    try:
        from seed_data import seed
        seed()
    except Exception as e:
        print(f"Warning seeding database: {e}")

    # 2. Check Frontend Dist Build
    if not os.path.exists(frontend_dist):
        print("\n[2/3] Building React Frontend...")
        subprocess.run(["npm", "run", "build"], cwd=os.path.join(project_root, "frontend"), shell=True)
    else:
        print("\n[2/3] Frontend build ready in frontend/dist!")

    # 3. Open Browser automatically after server launches
    url = "http://localhost:8080"
    print(f"\n[3/3] Starting Unified CodeGuard AI Server on {url}...")

    def open_browser():
        time.sleep(2)
        print(f"\n[LAUNCH] Opening browser at {url} ...")
        webbrowser.open(url)

    import threading
    threading.Thread(target=open_browser, daemon=True).start()

    # Launch Uvicorn server on port 8080
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8080, reload=False, app_dir=backend_dir)

if __name__ == "__main__":
    main()
