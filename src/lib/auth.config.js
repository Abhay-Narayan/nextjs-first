export const authConfig={
    pages: {
        signIn: "/login",
      },
    providers: [],
    callbacks:{
        async jwt({token, user}){
            //console.log("calling jwt",user);//returns null
            if(user){
                token.id = user.id;
                token.isAdmin = user._doc.isAdmin;
                token.email=user._doc.email;
            }
            return token;
        },

        async session({session, token}){
            if(token){
                session.user.id = token.id;
                session.user.isAdmin = token.isAdmin;
                session.user.email=token.email;
            }
           // console.log(session);
            return session;
        },
        authorized({auth, request}){
            const user = auth?.user;
            const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
            const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog");
            const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

            //ONLY ADMIN CAN REACH THE ADMIN DASHBOARD

            if(isOnAdminPanel && !user?.isAdmin) return false;

            //ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE

            if(isOnBlogPage && !user) return false;

            //ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE

            if(user && isOnLoginPage) {
                return Response.redirect(new URL("/", request.nextUrl));
            }

            return true;
        }
    }
}