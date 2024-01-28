
当前的语言代理框架旨在促进构建概念证明语言智能体（Language Agent）的搭建，但是同时忽视了非专家用户的使用，对应用级设计也关注较少。
我们创建了TianJiAgents，一个用于在日常生活中使用和托管语言智能体的开放平台。

我们现在在TianJiAgents中实现了三个智能体，
1. 数据智能体-用于用Python/SQL和数据工具进行数据分析；
2. 插件智能体-具有200多个日常工具，并且可供拓展；
3. 网络智能体-用于自动上网。

## 服务端


cd /root/OpenAgents

- 环境自动安装

bash backend/setup_script.sh

- 激活虚拟坏境

conda activate openagents



- kaggle.json配置

mkdir -p ~/.kaggle/

cp kaggle.json ~/.kaggle/

chmod 600 ~/.kaggle/kaggle.json


- 环境变量：
export OPENAI_API_KEY=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

export 
OPENAI_API_KEY=sk-O6Uo77vih1qwscIbBb343b430fA04b61B9Df08AbDa971404

export VARIABLE_REGISTER_BACKEND=redis

export MESSAGE_MEMORY_MANAGER_BACKEND=database

export JUPYTER_KERNEL_MEMORY_MANAGER_BACKEND=database

export MONGO_SERVER=127.0.0.1

export FLASK_APP=backend.main.py

- 服务端启动

#redis后台启动
redis-server --daemonize yes

cd /root/OpenAgents

nohup flask run -p 8000 --host=0.0.0.0 &


## 前端
- 环境变量：
本地：
export NEXT_PUBLIC_BACKEND_ENDPOINT=http://127.0.0.1:8000

线上：
export NEXT_PUBLIC_BACKEND_ENDPOINT=http://43.159.41.149:8000

- 启动
npm install (第一次初始化）

npm run build （正式发布进行打包）

npm start (生产环境启动）

## 🥑 TianJiAgents

我们用基于聊天的web UI构建了三个真实世界的智能体(查看[TianJiAgents的demo展示])。以下是我们的TianJiAgents框架的简要概览。您可以在我们的中找到更多关于概念和设计的详细信息。

### 数据智能体（Data Agent）

[数据智能体]是一款设计用于高效数据操作的全面工具包。它提供以下功能：

- 🔍 **搜索**： 快速定位所需的数据。
- 🛠️ **处理**：简化数据获取和处理。
- 🔄 **操作**：按照特定要求修改数据。
- 📊 **可视化**：以清晰且有见解的方式表示数据。

数据智能体高效地写入和执行代码，简化了大范围的数据相关任务。通过各种 [使用案例]了解它的潜力。

<div align="center">
    <img src="pics/data_agent.png" width="784"/>
</div>

<details>
  <summary>点击查看更多使用案例的屏幕截图</summary>
<div align="center">
    <img src="pics/data_agent_demo.png" width="784"/>
</div>

</details>

### 插件智能体（Plugins Agent）

[插件智能体] 无缝地与200多个第三方插件集成，每个插件都是精选的，用于丰富您日常生活的各个方面。有了这些插件，该代理使您能更有效地处理各种任务和活动。

🔌 **插件例子包括**：

- 🛍️ **购物**：Klarna购物
- ☁️ **天气**：XWeather
- 🔬 **科学探索**：Wolfram Alpha

#### 组合插件使用

发挥协同作用的力量！插件代理支持同时使用多个插件。计划旅行？无缝地将Klook、货币转换器和WeatherViz的功能整合。

#### 自动插件选择

我们的**自动插件选择**特性简化了您的选择。让代理直观地搜索并建议最适合您需求的插件。

深入更多 [使用案例] 查看插件智能体的能怎么做。

<div align="center">
  <img src="pics/plugins_agent.png" width="784"/>
</div>

<details>
  <summary>点击查看更多使用案例的屏幕截图</summary>
<div align="center">
    <img src="pics/plugins_agent_demo.png" width="784"/>
</div>




## 💻 本地部署

我们已经发布了TianJiAgents平台代码。随时在您的本地主机上进行部署！

以下是TianJiAgents的简要系统设计：
<div align="center">
    <img src="pics/system_design.png"/>
</div>

### 源码部署
请查看下面的文件和README文件来设置和启动localhost：

1. [**Backend**](backend/README.md): 我们的三个代理的 Flask 后端。
2. [**Frontend**](frontend/README.md): 前端 UI 和 WeBot Chrome 扩展程序。

P.S.：我们为了提升代码的可读性，对一些参数进行了重命名。如果你在2023年10月26日之前已经拉取了代码，这里提醒你，如果你想拉取最新的代码，由于部分key name的不同，之前的本地聊天记录将会丢失。

### Docker部署
请按照以下步骤使用docker-compose来部署TianJiAgents平台。

注意： docker仍在开发中，因此可能会有一些功能无法正常工作，响应也可能较慢。如果您有任何问题，请随时提出issue。如果您需要一个更稳定的版本，我们目前建议您从源代码部署。

1. 如果您想要使用kaggle的数据集，您必须修改Dockerfile中的信息为您的正确信息。
```
ENV KAGGLE_USER="" \
    KAGGLE_KEY="" 
```
2. 如果您不是在本地运行，您需要修改frontend/Dockerfile中的后端服务可访问的IP地址
```
ENV NEXT_PUBLIC_BACKEND_ENDPOINT http://x.x.x.x:8000
```
3. 在项目根目录运行docker compose build命令。
4. 如果您使用openai非官方服务，如FastChat，您需要在docker-compose.yml中修改OPENAI_API_BASE；否则您只需在docker-compose.yml中放置您的OPENAI_API_KEY。
5. 完成以上步骤后，您可以运行docker compose up -d以启动所有服务。

**注意**：
1. 如果你想要使用GPU，你需要先安装[Nvidia Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html),然后去掉[docker-compose.yml](docker-compose.yml#L56-L62)56-62行的注释。
2. 使用Auto plugin 将会从huggingface下载权重文件，在有些地区可能会出现连接超时，请自行解决网络问题。

## 📜 拓展TianJiAgents的教程
### 代码结构
在我们深入探讨如何扩展TianJiAgents之前，首先让我们简要了解一下代码结构以便更好地理解。
TianJiAgents的代码结构如下所示：
```bash
├── backend  # backend code
│   ├── README.md  # backend README for setup
│   ├── api  # RESTful APIs, to be called by the frontend
│   ├── app.py  # main flask app
│   ├── display_streaming.py  # rendering the streaming response
│   ├── kernel_publisher.py  # queue for code execution
│   ├── main.py  # main entry for the backend
│   ├── memory.py  # memory(storage) for the backend
│   ├── schemas.py  # constant definitions
│   ├── setup_script.sh  # one-click setup script for the backend
│   ├── static  # static files, e.g., cache and figs
│   └── utils  # utilities
├── frontend  # frontend code
│   ├── README.md  # frontend README for setup
│   ├── components  # React components
│   ├── hooks  # custom React hooks
│   ├── icons  # icon assets
│   ├── next-env.d.ts  # TypeScript declarations for Next.js environment variables
│   ├── next-i18next.config.js  # configuration settings for internationalization
│   ├── next.config.js  # configuration settings for Next.js
│   ├── package-lock.json  # generated by npm that describes the exact dependency tree
│   ├── package.json  # manifest file that describes the dependencies
│   ├── pages  # Next.js pages
│   ├── postcss.config.js  # configuration settings for PostCSS
│   ├── prettier.config.js  # configuration settings for Prettier
│   ├── public  # static assets
│   ├── styles  # global styles
│   ├── tailwind.config.js  # configuration settings for Tailwind CSS
│   ├── tsconfig.json  # configuration settings for TypeScript
│   ├── types  # type declarations
│   ├── utils  # utilities or helper functions
│   ├── vitest.config.ts  # configuration settings for ViTest
│   └── webot_extension.zip  # Chrome extension for Web Agent
└── real_agents  # language agents
    ├── adapters  # shared components for the three agents to adapt to the backend
    ├── data_agent  # data agent implementation
    ├── plugins_agent  # plugins agent implementation
    └── web_agent  # web agent implementation
```
如所示，`backend/` 和 `frontend/` 是自包含的，并且可以直接部署（参见[这里](#localhost-deployment)）。
这并不意味着它们不能被修改。
相反，您可以按照传统的*客户端-服务器*架构来根据您的需求扩展后端和前端。
对于`real_agents/`，我们设计它为“一个智能体，一个文件夹”的形式，以便于扩展新的代理。
值得注意的是，我们将其命名为“真实代理”，因为这里不仅包括了概念性的语言代理部分，还填补了语言代理和后端之间的空白。
例如，`adapters/` 包含了像流解析（streaming parsing）、数据模型（DataModel）、内存（memory）、回调（callbacks）等共享的适配器组件。
我们推荐感兴趣的读者参考我们的 [论文](https://arxiv.org/abs/2310.10634) 了解概念和实现设计。
我们也感谢 [LangChain](https://github.com/langchain-ai/langchain) ，因为我们基于他们的代码构建真实代理。

### 扩展一个新的智能体
如果您想构建一个新的智能体，超出我们提供的三个智能体，您可以按照以下步骤操作：
- 参考 `real_agents/` 文件夹，查看之前的智能体是如何实现的，并为您的代理创建一个新文件夹。
- 在新文件夹中实现智能体逻辑。在需要时使用 `adapters/` 文件夹下的组件。
- 在 `backend/api/` 文件夹下添加一个 `chat_<new_agent>.py` 文件，以定义新代理的聊天API，该API将由前端调用。
- 在 `backend/schemas.py` 中注册新的常量（如果需要的话）。
- 在 `frontend/types/agent.ts` 中添加一个新的 `OpenAgentID`，并在 `frontend/utils/app/api.ts` 和 `frontend/utils/app/const.ts` 中添加相应的API。
- 在需要时在 `frontend/components/Chat/Chat.tsx` 和 `frontend/components/Chat/ChatMessage.tsx` 中实现代理的UI。
- 运行本地主机脚本并测试您的新智能体。

请注意，如果有新的数据类型，即超出文本、图片、表格和json，您可能需要在 `backend/display_streaming.py` 中实现其解析逻辑，并添加新的数据模型。

### 扩展一个新的LLM
如果LLM已经托管并可以通过API调用，那么将新的LLM作为智能体主干进行扩展会更简单。
只需在 `backend/api/language_model.py` 中注册您的新模型。您可以参考lemur-chat作为模板。

如果LLM还没有被托管，我们有一个教程，教您如何部署一个新的LLM并将其作为API公开[这里]()（LLM托管待办事项）。

### 扩展一个新的工具
如果您想在插件智能体中扩展一个新工具，可以按照以下步骤操作：
- 参考在 `real_agents/plugins_agent/plugins/` 中已经构建的插件，并为您的工具创建一个新文件夹。
- 在新文件夹中实现工具逻辑。请注意，`ai-plugin.json` 和 `openapi.yaml` 对于工具被识别是必要的（可以由LLM生成，跟随其他工具，而不是手动编写）。而 `paths/` 是用于实际的工具API调用。
- 在 `real_agents/plugins_agent/plugins/plugin_names.py` 中注册新工具的名称。