using financas_dominio.Interface;
using financas_negocios.Interface;
using financas_negocios.Negocio;
using financas_repositorio.Contexto;
using financas_repositorio.Repositorio;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
#region [Adicionando serviços ao container]
builder.Services.AddControllers()

    .AddJsonOptions(options =>

    {

        // Ignorar campos somente leitura na serializaзгo JSON

        options.JsonSerializerOptions.IgnoreReadOnlyFields = true;

    })

    .AddNewtonsoftJson(op =>

    {

        // Evitar loop de referкncia na serializaзгo

        op.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;

    });


builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Configurar o contexto do banco de dados
builder.Services.AddDbContext<DbContexto>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//builder.Services.AddScoped<>();

// Configurar CORS para permitir qualquer origem, mйtodo e cabeзalho
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowAll", builder =>
//        builder.AllowAnyOrigin()
//               .AllowAnyMethod()
//               .AllowAnyHeader());
//});
builder.Services.AddCors(options =>

{

    options.AddPolicy("AllowAll", builder =>

        builder.AllowAnyOrigin()

               .AllowAnyMethod()

               .AllowAnyHeader());

});

builder.Services.AddScoped<INegocioUsuario, NegocioUsuario>();

builder.Services.AddScoped<IRepositorioUsuario, RepositorioUsuario>();

// Configurar o diretуrio estбtico do SPA (se houver um frontend SPA)
//builder.Services.AddSpaStaticFiles(diretorio =>
//{
//    diretorio.RootPath = "GerenciadorFinanceiro-UI"; // Exemplo de diretуrio do frontend
//});
#endregion

#region [Configuração do HTTP Request]


var app = builder.Build();

// Configurar o CORS para usar a polнtica criada
app.UseCors();

// Redirecionar requisiзхes HTTP para HTTPS
app.UseHttpsRedirection();

// Configurar autorização (se necessário)
app.UseAuthorization();

// Servir arquivos estбticos
app.UseStaticFiles();
//app.UseSpaStaticFiles();

//Configurar o pipeline do SPA (se houver)
//app.UseSpa(spa =>
//{
//    spa.Options.SourcePath = Path.Combine(Directory.GetCurrentDirectory(), "Fluxo-Financeiro/financas/front-end");

//    // Se estiver em desenvolvimento, use o proxy para o servidor do SPA
//    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200"); // URL do servidor de desenvolvimento do SPA (exemplo com Angular)
//});

// Mapear os controladores da API
app.MapControllers();

// Iniciar a aplicaзгo
app.Run();
#endregion