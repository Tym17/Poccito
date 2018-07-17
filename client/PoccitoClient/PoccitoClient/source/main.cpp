#ifdef _WIN32
# ifndef WIN_INC
#  define WIN_INC
#  include <Windows.h>
# endif
#endif

int custom_main(int ac, char **av);

// Remove console when it is a release build
#ifdef VS_RELEASE
int CALLBACK WinMain(
	_In_ HINSTANCE hInstance,
	_In_ HINSTANCE hPrevInstance,
	_In_ LPSTR     lpCmdLine,
	_In_ int       nCmdShow
)
{
	int ac;
	char **av = CommandLineToArgv(GetCommandLineA(), &ac);
	if (NULL == av)

	return custom_main(ac, av);
}
#else
int main(int argc, char **argv)
{
	return custom_main(argc, argv);
}
#endif /* !VS_RELEASE */