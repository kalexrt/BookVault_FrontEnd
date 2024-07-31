export function handleApiError(err: any) {
    if (err instanceof Error) {
        throw err;
      }
      if (typeof err === "object" && err !== null && "response" in err) {
        const errorResponse = err as {
          response: { data: { message: string } };
        };
        throw new Error(errorResponse.response.data.message);
      }
      throw new Error("Unknown error occurred");
}