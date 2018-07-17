#ifdef _WIN32
# ifndef WIN_INC
#  define WIN_INC
#  include <Windows.h>
# endif
#endif

int custom_main();

// Remove console when it is a release build
#ifdef VS_RELEASE
int CALLBACK WinMain(
	_In_ HINSTANCE hInstance,
	_In_ HINSTANCE hPrevInstance,
	_In_ LPSTR     lpCmdLine,
	_In_ int       nCmdShow
)
{
	return custom_main();
}
#else
int main()
{
	return custom_main();
}
#endif /* !VS_RELEASE */