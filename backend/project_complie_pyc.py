import compileall
import shutil
import os
from pathlib import Path

# 获取当前文件的路径
current_file_path = Path(__file__)

# 获取当前文件所在的目录，即项目目录
project_dir = current_file_path.parent.parent

# 定义源项目根目录
src_project_path = Path(os.path.join(project_dir,'backend'))
print(src_project_path)

# 定义目标项目根目录
dest_project_path = Path(os.path.join(project_dir,'backend_ist'))

# 清除项目中所有现有的 .pyc 文件
def clear_pyc_files(path):
    for pyc_file in path.rglob('*.pyc'):
        pyc_file.unlink()
    for pycache in path.rglob('__pycache__'):
        shutil.rmtree(pycache)

# 编译项目为 .pyc 文件
def compile_project_to_pyc(path):
    compileall.compile_dir(path, force=True)

if __name__ == "__main__":
    # 清除源项目中现有的 .pyc 文件和 __pycache__ 目录
    clear_pyc_files(src_project_path)
    
    # 清除目标项目中现有的 .pyc 文件和 __pycache__ 目录
    clear_pyc_files(dest_project_path)

    # 编译源项目
    compile_project_to_pyc(src_project_path)
    
    print("源项目编译完成。")
    print("所有现有的 .pyc 文件和 __pycache__ 目录已从源项目和目标项目中清除。")
