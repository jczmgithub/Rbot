<?php

namespace App\Http\Controllers;

use DeepCopy\Filter\KeepFilter;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\DatosRobot;
use App\Models\User;
use Auth;
use Illuminate\Support\Facades\Input;

class RobotController extends Controller
{
    public function dataRobot(Request $request ){

        $robot=Input::get('selecRobot');
        $motor=Input::get('selecMotor');
        $pasos=request()->get('pasos');
        $velocidad=request()->get('velocidad');

        $datosRobot = new DatosRobot();

        $datosRobot->robot=$robot;
        $datosRobot->motor=$motor;
        $datosRobot->pasos=$pasos;
        $datosRobot->velocidad=$velocidad;

        switch($request->submit) {

            case 'enviar':
                $file=fopen('../storage/app/datos.json','w+');
                //enviar contenido de formulario
                fwrite($file,"");
                fclose($file);
                break;

            case 'guardar':
                $file=fopen('../storage/app/datos.json','a+');
                fwrite($file,json_encode($datosRobot).PHP_EOL);
                fclose($file);
                break;
        }


        return back();

    }
    public function addFila(){
        return view('user.includes.filaNueva', ['modelos' => DB::table('user_robot')
            ->join('robots', 'user_robot.robot_id', '=', 'robots.id')
            ->select('user_robot.user_id' ,'robots.modelo')
            ->where('user_robot.user_id','=',Auth::user()->id)
            ->get()]);
    }
    public function formRobot(){
        return view('user.columnas.registrarRobot');
    }

}
