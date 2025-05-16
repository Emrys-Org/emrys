import time
import os
from typing import Any, Dict

# Try to load .env file if available
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

from uagents import Agent, Context, Model
from model import get_protocol_info, BLOCKCHAIN_TECHNOLOGIES

# Define models for requests and responses
class ProtocolInfoRequest(Model):
    protocol_name: str

class ProtocolInfoResponse(Model):
    timestamp: int
    protocol_name: str
    information: str
    agent_address: str

# Create the agent with environment variables for Railway deployment
PORT = int(os.environ.get("PORT", 8000))
SEED = os.environ.get("AGENT_SEED", "emrys_protocol_info_agent_seed")
ENDPOINT = os.environ.get("AGENT_ENDPOINT", f"http://localhost:{PORT}/submit")
LOG_LEVEL = os.environ.get("LOG_LEVEL", "INFO")

agent = Agent(
    name="Protocol Info Agent",
    seed=SEED,
    port=PORT,
    endpoint=[ENDPOINT],
    log_level=LOG_LEVEL
)

@agent.on_rest_get("/health", Model)
async def handle_health_check(ctx: Context) -> Dict[str, Any]:
    """Health check endpoint for monitoring."""
    ctx.logger.info("Health check requested")
    return {
        "status": "healthy",
        "timestamp": int(time.time())
    }

@agent.on_rest_post("/protocol/info", ProtocolInfoRequest, ProtocolInfoResponse)
async def handle_protocol_info(ctx: Context, req: ProtocolInfoRequest) -> ProtocolInfoResponse:
    """Endpoint to get information about a specific DeFi protocol."""
    ctx.logger.info(f"Received protocol info request for: {req.protocol_name}")
    
    # Get protocol information using the existing function
    info = await get_protocol_info(req.protocol_name)
    
    return ProtocolInfoResponse(
        timestamp=int(time.time()),
        protocol_name=req.protocol_name,
        information=info,
        agent_address=ctx.agent.address
    )

@agent.on_rest_get("/protocols/list", Model)
async def handle_list_protocols(ctx: Context) -> Dict[str, Any]:
    """Endpoint to list all available protocols."""
    ctx.logger.info("Protocol list requested")
    protocols = {key: tech.get('name', key) for key, tech in BLOCKCHAIN_TECHNOLOGIES.items()}
    
    return {
        "timestamp": int(time.time()),
        "protocols": protocols,
        "count": len(protocols)
    }

if __name__ == "__main__":
    print(f"Starting Protocol Info Agent on port {PORT}")
    print(f"Health check available at: http://localhost:{PORT}/health")
    print(f"Protocol list available at: http://localhost:{PORT}/protocols/list")
    print(f"Protocol info endpoint: http://localhost:{PORT}/protocol/info")
    agent.run() 