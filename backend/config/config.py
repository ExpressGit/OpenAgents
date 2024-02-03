import os


SHOULD_MOCK_AI_RESPONSE = bool(os.environ.get("MOCK", False))

# Set to True when running in production (on the hosted version)
# Used as a feature flag to enable or disable certain features
IS_PROD = os.environ.get("IS_PROD", False)

# 邮箱配置
class OpenaiSettings:
    OPENAI_API_KEY = ""
    # OPENAI_API_BASE = "http://api.aiadvice.top/v1"
    OPENAI_API_BASE = "https://api.openai.com/v1"

class DataBaseSettings:
    VARIABLE_REGISTER_BACKEND = 'redis'
    MESSAGE_MEMORY_MANAGER_BACKEND = 'database'  
    JUPYTER_KERNEL_MEMORY_MANAGER_BACKEND = 'database'
    MONGO_SERVER = '127.0.0.1'
    

