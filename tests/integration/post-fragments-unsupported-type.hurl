# tests/integration/post-fragments-unsupported-type.hurl
POST http://localhost:8080/v1/fragments
# We're sending a image/png (unsupported) fragment
Content-Type: image/json
# Include HTTP Basic Auth credentials
Authorization: Basic dXNlcjFAZW1haWwuY29tOnBhc3N3b3JkMQ==
# Body of the request goes in `...` when it's a string
`This is a fragment!`

# 1. We expect to get back an HTTP 415 Unsupported Media Type
HTTP/1.1 415
# We have various assertions about the response that we want to check
[Asserts]
# Assert that the response body contains the string "not found"
jsonpath "$.error.message" == "Unsupported Media Type: Body requires correct fragment data that is supported"
# Assert that the response body contains status error
jsonpath "$.status" == "error"
