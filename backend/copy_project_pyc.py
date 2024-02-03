import shutil
from pathlib import Path
import os

# 获取当前文件的路径
current_file_path = Path(__file__)

# 获取当前文件所在的目录，即项目目录
project_dir = current_file_path.parent.parent

# 定义源项目根目录
src_path = Path(os.path.join(project_dir,'backend'))

# 定义目标项目根目录
dest_path = Path(os.path.join(project_dir,'backend_dist'))

for src_file in src_path.glob('**/__pycache__/*.pyc'):  # 仅遍历 __pycache__ 目录下的 .pyc 文件
    # 构建相对路径，去除 __pycache__ 部分
    rel_path = src_file.relative_to(src_path).with_suffix('')
    parts = list(rel_path.parts[:-1])  # 去除文件名中的 Python 版本信息
    if parts[-1] == '__pycache__':
        parts.pop()  # 去除 __pycache__
    new_filename = src_file.stem.rsplit('.', 1)[0] + '.pyc'  # 重建文件名，去除版本号
    parts.append(new_filename)
    rel_path = Path(*parts)
    
    # 计算目标文件路径
    target_path = dest_path / rel_path
    # 创建目标目录
    target_path.parent.mkdir(parents=True, exist_ok=True)
    # 复制文件
    shutil.copy(src_file, target_path)

# 在 server 目录下固定生成一个 static 目录
server_static_path = dest_path / 'server' / 'static'
server_static_path.mkdir(parents=True, exist_ok=True)  # 确保目录存在，如果已存在则忽略

print("复制完成。")
