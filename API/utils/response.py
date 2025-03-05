from typing import Optional, Dict, Any

def success_response(data: Optional[Dict[str, Any]] = None, message: str = "Success", status_code: int = 200) -> Dict[str, Any]:
    response = {"status": status_code, "message": message}
    if data is not None:
        response["data"] = data
    return response

def error_response(status_code: int, message: str, details: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    response = {"status": status_code, "message": message}
    if details is not None:
        response["details"] = details
    return response